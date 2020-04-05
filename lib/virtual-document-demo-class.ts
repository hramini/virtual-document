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
    const { element: htmlElement } = this.virtualDocument.makeElement({ tagName: ElementTag.HTML });
    const { element: headElement } = this.virtualDocument.makeElement({ tagName: ElementTag.HEAD });
    const { element: bodyElement } = this.virtualDocument.makeElement({ tagName: ElementTag.BODY });
    const { element: rootDivElement } = this.virtualDocument.makeElement({
      tagName: ElementTag.DIV
    });
    VirtualDocument.setId({ identifier: 'root', source: rootDivElement });
    VirtualDocument.append({ source: bodyElement, element: rootDivElement });
    VirtualDocument.append({ source: htmlElement, element: headElement });
    VirtualDocument.append({ source: htmlElement, element: bodyElement });
    this.virtualDocument.appendToDoc({ element: htmlElement });
  }
}
