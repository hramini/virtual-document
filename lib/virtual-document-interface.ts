export interface FoundElement {
  isFound: boolean;
  element: HTMLElement;
}

export interface IVirtualDocumentMakeElementOut {
  element: HTMLElement;
}

export interface IElementCollection {
  elementCollection: HTMLCollection;
}

export interface IDocument {
  doc: Document;
}

export interface IVirtualDocumentEntry {
  doc: Document;
}

export interface IElementId {
  id: string;
}

export interface MakeElementOption {
  tagName: string;
}

export interface IVirtualDocumentSetIdIn {
  id: string;
  source: HTMLElement;
}

export interface IVirtualDocumentAppendIn {
  source?: HTMLElement | Document;
  element: HTMLElement;
}

export interface IVirtualDocumentAppendStringIn {
  source: HTMLElement;
  text: string;
}

export interface IVirtualDocumentFindElementsByTagNameIn {
  source?: HTMLElement | Document;
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
