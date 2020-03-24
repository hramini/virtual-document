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
    createBase() {
        const { element: htmlElement } = this.makeElement({ tagName: 'html' });
        const { element: headElement } = this.makeElement({ tagName: 'head' });
        const { element: bodyElement } = this.makeElement({ tagName: 'body' });
        const { element: rootDivElement } = this.makeElement({ tagName: 'div' });
        this.setId({ source: rootDivElement, id: 'root' });
        this.append({ source: bodyElement, element: rootDivElement });
        this.append({ source: htmlElement, element: headElement });
        this.append({ source: htmlElement, element: bodyElement });
        this.append({ source: this.doc, element: htmlElement });
    }
    makeElement(param) {
        const { tagName } = param;
        let element;
        const { status: tagNameLength } = this.checkStringLength({
            value: tagName,
            length: 0
        });
        if (tagNameLength) {
            element = this.doc.createElement(tagName);
        }
        else {
            element = {};
        }
        return { element };
    }
    findElementById(param) {
        const { id } = param;
        const element = this.doc.getElementById(id);
        return {
            isFound: element ? true : false,
            element: element || {}
        };
    }
    append(param) {
        const { source = this.doc, element } = param;
        source.append(element);
    }
    appendString(param) {
        const { source, text } = param;
        source.append(text);
    }
    setId(param) {
        const { source, id } = param;
        source.id = id;
    }
    replaceElements(param) {
        const { sourceElement, replaceableElement } = param;
        sourceElement.replaceWith(replaceableElement);
    }
    setAttribute(param) {
        const { sourceElement, attributeKey, attributeValue } = param;
        sourceElement.setAttribute(attributeKey, attributeValue);
    }
    findAttribute(param) {
        const { sourceElement, attributeKey } = param;
        const foundAttribute = sourceElement.getAttribute(attributeKey);
        if (foundAttribute) {
            return { isFound: true, attributeValue: foundAttribute };
        }
        else {
            return { isFound: false, attributeValue: '' };
        }
    }
    findParentElementByChildId(param) {
        const { id } = param;
        const { element: childElement } = this.findElementById({ id });
        const element = childElement.parentElement;
        return {
            isFound: element ? true : false,
            element: element || {}
        };
    }
    findElementsByTagName(param) {
        const { source = this.doc, tagName } = param;
        const elementCollection = source.getElementsByTagName(tagName);
        return { elementCollection };
    }
    findFirstElementByQuery(param) {
        const { query } = param;
        const foundElement = this.doc.querySelector(query);
        if (foundElement) {
            return { isFound: true, foundElement };
        }
        else {
            return { isFound: false, foundElement: {} };
        }
    }
    exportDocument() {
        return { doc: this.doc };
    }
    checkStringLength(param) {
        const { value, length } = param;
        const status = value.length > length;
        return { status };
    }
}
exports.VirtualDocument = VirtualDocument;
