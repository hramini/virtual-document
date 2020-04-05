import {
  IVirtualDocumentAppendIn,
  IVirtualDocumentAppendToDocIn,
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
  IVirtualDocumentMakeElementIn,
  IVirtualDocumentMakeElementOut,
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

  public makeElement(param: IVirtualDocumentMakeElementIn): IVirtualDocumentMakeElementOut {
    const { tagName } = param;
    const { doc } = this;
    const element: HTMLElement = doc.createElement(tagName);

    return { element };
  }

  public findElementById(
    param: IVirtualDocumentFindElementByIdIn
  ): IVirtualDocumentFindElementByIdOut {
    const { identifier } = param;
    const { doc } = this;
    const element: HTMLElement | null = doc.getElementById(identifier);

    return {
      isFound: !!element,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      element: element ?? ({} as HTMLElement)
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
    return { isFound: !!element, foundElement: element ?? ({} as HTMLElement) };
  }

  public exportDocument(): IVirtualDocumentExportDocumentOut {
    const { doc } = this;

    return { doc };
  }

  public static append(param: IVirtualDocumentAppendIn): void {
    const { source, element } = param;
    source.append(element);
  }

  public static setId(param: IVirtualDocumentSetIdIn): void {
    const { source, identifier } = param;
    // eslint-disable-next-line id-length
    source.id = identifier;
  }

  public static setInnerHtml(param: IVirtualDocumentSetInnerHtmlIn): void {
    const { source, innerHtml } = param;
    source.innerHTML = innerHtml;
  }

  public static findElementsByTagName(
    param: IVirtualDocumentFindElementsByTagNameIn
  ): IVirtualDocumentFindElementsByTagNameOut {
    const { source, tagName } = param;
    const elementCollection: HTMLCollection = source.getElementsByTagName(tagName);

    return { elementCollection };
  }

  public static replaceElements<T extends Element>(
    param: IVirtualDocumentReplaceElementsIn<T>
  ): void {
    const { sourceElement, replaceableElement } = param;
    sourceElement.replaceWith(replaceableElement);
  }

  public static setAttribute(param: IVirtualDocumentSetAttributeIn): void {
    const { sourceElement, attributeKey, attributeValue } = param;
    sourceElement.setAttribute(attributeKey, attributeValue);
  }

  public static findAttribute(
    param: IVirtualDocumentFindAttributeIn
  ): IVirtualDocumentFindAttributeOut {
    const { sourceElement, attributeKey } = param;
    const foundAttribute: string | null = sourceElement.getAttribute(attributeKey);

    // TODO: replace with the method in validator class
    if (foundAttribute !== null) {
      return { isFound: true, attributeValue: foundAttribute };
    }

    return { isFound: false, attributeValue: '' };
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
