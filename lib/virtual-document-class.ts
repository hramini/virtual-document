import {
  FoundElement,
  IDocument,
  IElementCollection,
  IElementId,
  IVirtualDocumentAppendIn,
  IVirtualDocumentAppendStringIn,
  IVirtualDocumentCheckStringLengthIn,
  IVirtualDocumentCheckStringLengthOut,
  IVirtualDocumentEntry,
  IVirtualDocumentFindAttributeIn,
  IVirtualDocumentFindAttributeOut,
  IVirtualDocumentFindElementsByTagNameIn,
  IVirtualDocumentFindFirstElementByQueryIn,
  IVirtualDocumentFindFirstElementByQueryOut,
  IVirtualDocumentMakeElementOut,
  IVirtualDocumentReplaceElementsIn,
  IVirtualDocumentSetAttributeIn,
  IVirtualDocumentSetIdIn,
  MakeElementOption
} from './virtual-document-interface';

export class VirtualDocument {
  private doc: Document;

  constructor(entry?: IVirtualDocumentEntry) {
    if (entry) {
      const { doc } = entry;
      this.doc = doc;
    } else {
      this.doc = new Document();
    }
  }

  public createBase(): void {
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

  public makeElement(param: MakeElementOption): IVirtualDocumentMakeElementOut {
    const { tagName } = param;
    let element: HTMLElement;
    const { status: tagNameLength } = this.checkStringLength({
      value: tagName,
      length: 0
    });
    if (tagNameLength) {
      element = this.doc.createElement(tagName);
    } else {
      element = {} as HTMLElement;
    }
    return { element };
  }

  public findElementById(param: IElementId): FoundElement {
    const { id } = param;
    const element: HTMLElement | null = this.doc.getElementById(id);
    return {
      isFound: element ? true : false,
      element: element || ({} as HTMLElement)
    };
  }

  public append(param: IVirtualDocumentAppendIn): void {
    const { source = this.doc, element } = param;
    source.append(element);
  }

  public appendString(param: IVirtualDocumentAppendStringIn): void {
    const { source, text } = param;
    source.append(text);
  }

  public setId(param: IVirtualDocumentSetIdIn): void {
    const { source, id } = param;
    source.id = id;
  }

  public replaceElements<T extends Element>(param: IVirtualDocumentReplaceElementsIn<T>): void {
    const { sourceElement, replaceableElement } = param;
    sourceElement.replaceWith(replaceableElement);
  }

  public setAttribute(param: IVirtualDocumentSetAttributeIn): void {
    const { sourceElement, attributeKey, attributeValue } = param;
    sourceElement.setAttribute(attributeKey, attributeValue);
  }

  public findAttribute(param: IVirtualDocumentFindAttributeIn): IVirtualDocumentFindAttributeOut {
    const { sourceElement, attributeKey } = param;
    const foundAttribute: string | null = sourceElement.getAttribute(attributeKey);

    if (foundAttribute) {
      return { isFound: true, attributeValue: foundAttribute };
    } else {
      return { isFound: false, attributeValue: '' };
    }
  }

  public findParentElementByChildId(param: IElementId): FoundElement {
    const { id } = param;
    const { element: childElement } = this.findElementById({ id });
    const element: HTMLElement | null = childElement.parentElement;
    return {
      isFound: element ? true : false,
      element: element || ({} as HTMLElement)
    };
  }

  public findElementsByTagName(param: IVirtualDocumentFindElementsByTagNameIn): IElementCollection {
    const { source = this.doc, tagName } = param;
    const elementCollection: HTMLCollection = source.getElementsByTagName(tagName);
    return { elementCollection };
  }

  public findFirstElementByQuery(
    param: IVirtualDocumentFindFirstElementByQueryIn
  ): IVirtualDocumentFindFirstElementByQueryOut {
    const { query } = param;
    const foundElement: Element | null = this.doc.querySelector(query);

    if (foundElement) {
      return { isFound: true, foundElement };
    } else {
      return { isFound: false, foundElement: {} as Element };
    }
  }

  public exportDocument(): IDocument {
    return { doc: this.doc };
  }

  // TODO: creating a class for these kinds of conditions //
  private checkStringLength(
    param: IVirtualDocumentCheckStringLengthIn
  ): IVirtualDocumentCheckStringLengthOut {
    const { value, length } = param;
    const status: boolean = value.length > length;
    return { status };
  }
}
