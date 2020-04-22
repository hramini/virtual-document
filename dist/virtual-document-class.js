"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VirtualDocument {
    constructor(entry) {
        if (entry) {
            const { doc } = entry;
            this.doc = doc;
        }
        else {
            this.doc = new Document();
        }
    }
    createNewElement(param) {
        const { tagName } = param;
        const { doc } = this;
        const element = doc.createElement(tagName);
        return { element };
    }
    findElementById(param) {
        const { elementId } = param;
        const { doc } = this;
        const element = doc.getElementById(elementId);
        return {
            element: (element !== null && element !== void 0 ? element : {}),
            isFound: !!element
        };
    }
    appendToDoc(param) {
        const { element } = param;
        const { doc } = this;
        doc.append(element);
    }
    findElementsByTagNameInDoc(param) {
        const { tagName } = param;
        const { doc } = this;
        const elementCollection = doc.getElementsByTagName(tagName);
        return { elementCollection };
    }
    findFirstElementByQuery(param) {
        const { query } = param;
        const { doc } = this;
        const element = doc.querySelector(query);
        return { element: (element !== null && element !== void 0 ? element : {}), isFound: !!element };
    }
    exportDocument() {
        const { doc } = this;
        return { doc };
    }
    static append(param) {
        const { appendTo, element } = param;
        appendTo.append(element);
    }
    static setId(param) {
        const { element, identifier } = param;
        element.id = identifier;
    }
    static setInnerHtml(param) {
        const { element, innerHtml } = param;
        element.innerHTML = innerHtml;
    }
    static findElementsByTagName(param) {
        const { element, tagName } = param;
        const elementCollection = element.getElementsByTagName(tagName);
        return { elementCollection };
    }
    static replaceElements(param) {
        const { sourceElement, replaceableElement } = param;
        sourceElement.replaceWith(replaceableElement);
    }
    static setAttribute(param) {
        const { element, attributeKey, attributeValue } = param;
        element.setAttribute(attributeKey, attributeValue);
    }
    static findAttribute(param) {
        const { element, attributeKey } = param;
        const foundAttribute = element.getAttribute(attributeKey);
        if (foundAttribute !== null) {
            return { attributeValue: foundAttribute, isFound: true };
        }
        return { attributeValue: '', isFound: false };
    }
    static getParentElement(param) {
        const { element } = param;
        const { parentElement } = element;
        return {
            isFound: !!parentElement,
            parentElement: (parentElement !== null && parentElement !== void 0 ? parentElement : {})
        };
    }
}
exports.VirtualDocument = VirtualDocument;
