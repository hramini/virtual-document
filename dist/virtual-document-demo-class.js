"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_class_1 = require("./virtual-document-class");
const virtual_document_enum_1 = require("./virtual-document-enum");
class VirtualDocumentDemo {
    constructor(entry) {
        const { virtualDocument } = entry;
        this.virtualDocument = virtualDocument;
    }
    createBase() {
        const { element: htmlElement } = this.virtualDocument.makeElement({ tagName: virtual_document_enum_1.ElementTag.HTML });
        const { element: headElement } = this.virtualDocument.makeElement({ tagName: virtual_document_enum_1.ElementTag.HEAD });
        const { element: bodyElement } = this.virtualDocument.makeElement({ tagName: virtual_document_enum_1.ElementTag.BODY });
        const { element: rootDivElement } = this.virtualDocument.makeElement({
            tagName: virtual_document_enum_1.ElementTag.DIV
        });
        virtual_document_class_1.VirtualDocument.setId({ identifier: 'root', source: rootDivElement });
        virtual_document_class_1.VirtualDocument.append({ source: bodyElement, element: rootDivElement });
        virtual_document_class_1.VirtualDocument.append({ source: htmlElement, element: headElement });
        virtual_document_class_1.VirtualDocument.append({ source: htmlElement, element: bodyElement });
        this.virtualDocument.appendToDoc({ element: htmlElement });
    }
}
exports.VirtualDocumentDemo = VirtualDocumentDemo;
