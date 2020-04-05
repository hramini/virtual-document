import { IVirtualDocumentAppendIn, IVirtualDocumentAppendToDocIn, IVirtualDocumentEntry, IVirtualDocumentExportDocumentOut, IVirtualDocumentFindAttributeIn, IVirtualDocumentFindAttributeOut, IVirtualDocumentFindElementByIdIn, IVirtualDocumentFindElementByIdOut, IVirtualDocumentFindElementsByTagNameIn, IVirtualDocumentFindElementsByTagNameInDocIn, IVirtualDocumentFindElementsByTagNameInDocOut, IVirtualDocumentFindElementsByTagNameOut, IVirtualDocumentFindFirstElementByQueryIn, IVirtualDocumentFindFirstElementByQueryOut, IVirtualDocumentGetParentElementIn, IVirtualDocumentGetParentElementOut, IVirtualDocumentMakeElementIn, IVirtualDocumentMakeElementOut, IVirtualDocumentReplaceElementsIn, IVirtualDocumentSetAttributeIn, IVirtualDocumentSetIdIn, IVirtualDocumentSetInnerHtmlIn } from './virtual-document-interface';
export declare class VirtualDocument {
    private readonly doc;
    constructor(entry?: IVirtualDocumentEntry);
    makeElement(param: IVirtualDocumentMakeElementIn): IVirtualDocumentMakeElementOut;
    findElementById(param: IVirtualDocumentFindElementByIdIn): IVirtualDocumentFindElementByIdOut;
    appendToDoc(param: IVirtualDocumentAppendToDocIn): void;
    findElementsByTagNameInDoc(param: IVirtualDocumentFindElementsByTagNameInDocIn): IVirtualDocumentFindElementsByTagNameInDocOut;
    findFirstElementByQuery(param: IVirtualDocumentFindFirstElementByQueryIn): IVirtualDocumentFindFirstElementByQueryOut;
    exportDocument(): IVirtualDocumentExportDocumentOut;
    static append(param: IVirtualDocumentAppendIn): void;
    static setId(param: IVirtualDocumentSetIdIn): void;
    static setInnerHtml(param: IVirtualDocumentSetInnerHtmlIn): void;
    static findElementsByTagName(param: IVirtualDocumentFindElementsByTagNameIn): IVirtualDocumentFindElementsByTagNameOut;
    static replaceElements<T extends Element>(param: IVirtualDocumentReplaceElementsIn<T>): void;
    static setAttribute(param: IVirtualDocumentSetAttributeIn): void;
    static findAttribute(param: IVirtualDocumentFindAttributeIn): IVirtualDocumentFindAttributeOut;
    static getParentElement(param: IVirtualDocumentGetParentElementIn): IVirtualDocumentGetParentElementOut;
}
