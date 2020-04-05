import { ElementTag } from './virtual-document-enum';

export interface IVirtualDocumentFindElementByIdOut {
  isFound: boolean;
  element: HTMLElement;
}

export interface IVirtualDocumentMakeElementOut {
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

export interface IVirtualDocumentEntry {
  doc: Document;
}

export interface IVirtualDocumentFindElementByIdIn {
  identifier: string;
}

export interface IVirtualDocumentMakeElementIn {
  tagName: ElementTag;
}

export interface IVirtualDocumentSetIdIn {
  identifier: string;
  source: HTMLElement;
}

export interface IVirtualDocumentSetInnerHtmlIn {
  innerHtml: string;
  source: HTMLElement;
}

export interface IVirtualDocumentAppendToDocIn {
  element: HTMLElement;
}

export interface IVirtualDocumentAppendIn {
  source: HTMLElement;
  element: HTMLElement | string;
}

export interface IVirtualDocumentFindElementsByTagNameInDocIn {
  tagName: string;
}

export interface IVirtualDocumentFindElementsByTagNameIn {
  source: HTMLElement;
  tagName: string;
}

export interface IVirtualDocumentCheckStringLengthIn {
  value: string;
  length: number;
}

export interface IVirtualDocumentCheckStringLengthOut {
  status: boolean;
}

export interface IVirtualDocumentSetAttributeIn {
  sourceElement: HTMLElement;
  attributeKey: string;
  attributeValue: string;
}

export interface IVirtualDocumentFindAttributeIn {
  sourceElement: HTMLElement;
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
  foundElement: Element;
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
