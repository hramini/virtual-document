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
        const { element: htmlElement } = this.virtualDocument.createNewElement({
            tagName: virtual_document_enum_1.ElementTag.HTML
        });
        const { element: headElement } = this.virtualDocument.createNewElement({
            tagName: virtual_document_enum_1.ElementTag.HEAD
        });
        const { element: bodyElement } = this.virtualDocument.createNewElement({
            tagName: virtual_document_enum_1.ElementTag.BODY
        });
        const { element: rootDivElement } = this.virtualDocument.createNewElement({
            tagName: virtual_document_enum_1.ElementTag.DIV
        });
        virtual_document_class_1.VirtualDocument.setId({ element: rootDivElement, identifier: 'root' });
        virtual_document_class_1.VirtualDocument.append({ appendTo: bodyElement, element: rootDivElement });
        virtual_document_class_1.VirtualDocument.append({ appendTo: htmlElement, element: headElement });
        virtual_document_class_1.VirtualDocument.append({ appendTo: htmlElement, element: bodyElement });
        this.virtualDocument.appendToDoc({ element: htmlElement });
    }
}
exports.VirtualDocumentDemo = VirtualDocumentDemo;
