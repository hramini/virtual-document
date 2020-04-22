import {
  IVirtualDocumentAppendIn,
  IVirtualDocumentAppendToDocIn,
  IVirtualDocumentCreateNewElementIn,
  IVirtualDocumentCreateNewElementOut,
  IVirtualDocumentEntry,
  IVirtualDocumentExportDocumentOut,
  IVirtualDocumentFindAttributeIn,
  IVirtualDocumentFindAttributeOut,
  IVirtualDocumentFindElementByIdIn,
  IVirtualDocumentFindElementByIdOut,
  IVirtualDocumentFindElementsByTagNameIn,
  IVirtualDocumentFindElementsByTagNameInDocIn,
  IVirtualDocumentFindElementsByTagNameInDocOut,
  IVirtualDocumentFindElementsByTagNameOut,
  IVirtualDocumentFindFirstElementByQueryIn,
  IVirtualDocumentFindFirstElementByQueryOut,
  IVirtualDocumentGetParentElementIn,
  IVirtualDocumentGetParentElementOut,
  IVirtualDocumentReplaceElementsIn,
  IVirtualDocumentSetAttributeIn,
  IVirtualDocumentSetIdIn,
  IVirtualDocumentSetInnerHtmlIn
} from './virtual-document-interface';

export class VirtualDocument {
  private readonly doc: Document;

  public constructor(entry?: IVirtualDocumentEntry) {
    if (entry) {
      const { doc } = entry;
      this.doc = doc;
    } else {
      this.doc = new Document();
    }
  }

  public createNewElement(
    param: IVirtualDocumentCreateNewElementIn
  ): IVirtualDocumentCreateNewElementOut {
    const { tagName } = param;
    const { doc } = this;
    const element: HTMLElement = doc.createElement(tagName);

    return { element };
  }

  public findElementById(
    param: IVirtualDocumentFindElementByIdIn
  ): IVirtualDocumentFindElementByIdOut {
    const { elementId } = param;
    const { doc } = this;
    const element: HTMLElement | null = doc.getElementById(elementId);

    return {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      element: element ?? ({} as HTMLElement),
      isFound: !!element
    };
  }

  public appendToDoc(param: IVirtualDocumentAppendToDocIn): void {
    const { element } = param;
    const { doc } = this;
    doc.append(element);
  }

  public findElementsByTagNameInDoc(
    param: IVirtualDocumentFindElementsByTagNameInDocIn
  ): IVirtualDocumentFindElementsByTagNameInDocOut {
    const { tagName } = param;
    const { doc } = this;
    const elementCollection: HTMLCollection = doc.getElementsByTagName(tagName);

    return { elementCollection };
  }

  public findFirstElementByQuery(
    param: IVirtualDocumentFindFirstElementByQueryIn
  ): IVirtualDocumentFindFirstElementByQueryOut {
    const { query } = param;
    const { doc } = this;
    const element: Element | null = doc.querySelector(query);

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return { element: element ?? ({} as HTMLElement), isFound: !!element };
  }

  public exportDocument(): IVirtualDocumentExportDocumentOut {
    const { doc } = this;

    return { doc };
  }

  public static append(param: IVirtualDocumentAppendIn): void {
    const { appendTo, element } = param;
    appendTo.append(element);
  }

  public static setId(param: IVirtualDocumentSetIdIn): void {
    const { element, identifier } = param;
    // eslint-disable-next-line id-length
    element.id = identifier;
  }

  public static setInnerHtml(param: IVirtualDocumentSetInnerHtmlIn): void {
    const { element, innerHtml } = param;
    element.innerHTML = innerHtml;
  }

  public static findElementsByTagName(
    param: IVirtualDocumentFindElementsByTagNameIn
  ): IVirtualDocumentFindElementsByTagNameOut {
    const { element, tagName } = param;
    const elementCollection: HTMLCollection = element.getElementsByTagName(tagName);

    return { elementCollection };
  }

  public static replaceElements<T extends Element>(
    param: IVirtualDocumentReplaceElementsIn<T>
  ): void {
    const { sourceElement, replaceableElement } = param;
    sourceElement.replaceWith(replaceableElement);
  }

  public static setAttribute(param: IVirtualDocumentSetAttributeIn): void {
    const { element, attributeKey, attributeValue } = param;
    element.setAttribute(attributeKey, attributeValue);
  }

  public static findAttribute(
    param: IVirtualDocumentFindAttributeIn
  ): IVirtualDocumentFindAttributeOut {
    const { element, attributeKey } = param;
    const foundAttribute: string | null = element.getAttribute(attributeKey);

    // TODO: replace with the method in validator class
    if (foundAttribute !== null) {
      return { attributeValue: foundAttribute, isFound: true };
    }

    return { attributeValue: '', isFound: false };
  }

  public static getParentElement(
    param: IVirtualDocumentGetParentElementIn
  ): IVirtualDocumentGetParentElementOut {
    const { element } = param;
    const { parentElement } = element;

    return {
      isFound: !!parentElement,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      parentElement: parentElement ?? ({} as HTMLElement)
    };
  }
}
