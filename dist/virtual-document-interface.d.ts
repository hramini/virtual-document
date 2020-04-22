import { ElementTag } from './virtual-document-enum';
export interface IVirtualDocumentEntry {
    doc: Document;
}
export interface IVirtualDocumentFindElementByIdOut {
    isFound: boolean;
    element: HTMLElement;
}
export interface IVirtualDocumentCreateNewElementIn {
    tagName: string | ElementTag;
}
export interface IVirtualDocumentCreateNewElementOut {
    element: HTMLElement;
}
export interface IVirtualDocumentFindElementsByTagNameInDocOut {
    elementCollection: HTMLCollection;
}
export interface IVirtualDocumentFindElementsByTagNameOut {
    elementCollection: HTMLCollection;
}
export interface IVirtualDocumentExportDocumentOut {
    doc: Document;
}
export interface IVirtualDocumentFindElementByIdIn {
    elementId: string;
}
export interface IVirtualDocumentSetIdIn {
    identifier: string;
    element: HTMLElement;
}
export interface IVirtualDocumentSetInnerHtmlIn {
    innerHtml: string;
    element: HTMLElement;
}
export interface IVirtualDocumentAppendToDocIn {
    element: HTMLElement;
}
export interface IVirtualDocumentAppendIn {
    appendTo: HTMLElement;
    element: HTMLElement | string;
}
export interface IVirtualDocumentFindElementsByTagNameInDocIn {
    tagName: string;
}
export interface IVirtualDocumentFindElementsByTagNameIn {
    element: HTMLElement;
    tagName: string;
}
export interface IVirtualDocumentSetAttributeIn {
    element: HTMLElement;
    attributeKey: string;
    attributeValue: string;
}
export interface IVirtualDocumentFindAttributeIn {
    element: HTMLElement;
    attributeKey: string;
}
export interface IVirtualDocumentFindAttributeOut {
    isFound: boolean;
    attributeValue: string;
}
export interface IVirtualDocumentFindFirstElementByQueryIn {
    query: string;
}
export interface IVirtualDocumentFindFirstElementByQueryOut {
    isFound: boolean;
    element: Element;
}
export interface IVirtualDocumentReplaceElementsIn<T extends Element> {
    sourceElement: T;
    replaceableElement: T;
}
export interface IVirtualDocumentGetParentElementIn {
    element: HTMLElement;
}
export interface IVirtualDocumentGetParentElementOut {
    isFound: boolean;
    parentElement: HTMLElement;
}
