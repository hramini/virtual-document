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
    makeElement(param) {
        const { tagName } = param;
        const { doc } = this;
        const element = doc.createElement(tagName);
        return { element };
    }
    findElementById(param) {
        const { identifier } = param;
        const { doc } = this;
        const element = doc.getElementById(identifier);
        return {
            isFound: !!element,
            element: (element !== null && element !== void 0 ? element : {})
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
        return { isFound: !!element, foundElement: (element !== null && element !== void 0 ? element : {}) };
    }
    exportDocument() {
        const { doc } = this;
        return { doc };
    }
    static append(param) {
        const { source, element } = param;
        source.append(element);
    }
    static setId(param) {
        const { source, identifier } = param;
        source.id = identifier;
    }
    static setInnerHtml(param) {
        const { source, innerHtml } = param;
        source.innerHTML = innerHtml;
    }
    static findElementsByTagName(param) {
        const { source, tagName } = param;
        const elementCollection = source.getElementsByTagName(tagName);
        return { elementCollection };
    }
    static replaceElements(param) {
        const { sourceElement, replaceableElement } = param;
        sourceElement.replaceWith(replaceableElement);
    }
    static setAttribute(param) {
        const { sourceElement, attributeKey, attributeValue } = param;
        sourceElement.setAttribute(attributeKey, attributeValue);
    }
    static findAttribute(param) {
        const { sourceElement, attributeKey } = param;
        const foundAttribute = sourceElement.getAttribute(attributeKey);
        if (foundAttribute !== null) {
            return { isFound: true, attributeValue: foundAttribute };
        }
        return { isFound: false, attributeValue: '' };
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
