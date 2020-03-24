import { FoundElement, IDocument, IElementCollection, IElementId, IVirtualDocumentAppendIn, IVirtualDocumentAppendStringIn, IVirtualDocumentEntry, IVirtualDocumentFindAttributeIn, IVirtualDocumentFindAttributeOut, IVirtualDocumentFindElementsByTagNameIn, IVirtualDocumentFindFirstElementByQueryIn, IVirtualDocumentFindFirstElementByQueryOut, IVirtualDocumentMakeElementOut, IVirtualDocumentReplaceElementsIn, IVirtualDocumentSetAttributeIn, IVirtualDocumentSetIdIn, MakeElementOption } from './virtual-document-interface';
export declare class VirtualDocument {
    private doc;
    constructor(entry?: IVirtualDocumentEntry);
    createBase(): void;
    makeElement(param: MakeElementOption): IVirtualDocumentMakeElementOut;
    findElementById(param: IElementId): FoundElement;
    append(param: IVirtualDocumentAppendIn): void;
    appendString(param: IVirtualDocumentAppendStringIn): void;
    setId(param: IVirtualDocumentSetIdIn): void;
    replaceElements<T extends Element>(param: IVirtualDocumentReplaceElementsIn<T>): void;
    setAttribute(param: IVirtualDocumentSetAttributeIn): void;
    findAttribute(param: IVirtualDocumentFindAttributeIn): IVirtualDocumentFindAttributeOut;
    findParentElementByChildId(param: IElementId): FoundElement;
    findElementsByTagName(param: IVirtualDocumentFindElementsByTagNameIn): IElementCollection;
    findFirstElementByQuery(param: IVirtualDocumentFindFirstElementByQueryIn): IVirtualDocumentFindFirstElementByQueryOut;
    exportDocument(): IDocument;
    private checkStringLength;
}
