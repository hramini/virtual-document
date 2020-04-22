import { VirtualDocument } from './virtual-document-class';
import { IVirtualDocumentDemoEntry } from './virtual-document-demo-interface';
import { ElementTag } from './virtual-document-enum';

export class VirtualDocumentDemo {
  private readonly virtualDocument: VirtualDocument;

  public constructor(entry: IVirtualDocumentDemoEntry) {
    const { virtualDocument } = entry;
    this.virtualDocument = virtualDocument;
  }

  public createBase(): void {
    const { element: htmlElement } = this.virtualDocument.createNewElement({
      tagName: ElementTag.HTML
    });
    const { element: headElement } = this.virtualDocument.createNewElement({
      tagName: ElementTag.HEAD
    });
    const { element: bodyElement } = this.virtualDocument.createNewElement({
      tagName: ElementTag.BODY
    });
    const { element: rootDivElement } = this.virtualDocument.createNewElement({
      tagName: ElementTag.DIV
    });
    VirtualDocument.setId({ element: rootDivElement, identifier: 'root' });
    VirtualDocument.append({ appendTo: bodyElement, element: rootDivElement });
    VirtualDocument.append({ appendTo: htmlElement, element: headElement });
    VirtualDocument.append({ appendTo: htmlElement, element: bodyElement });
    this.virtualDocument.appendToDoc({ element: htmlElement });
  }
}
