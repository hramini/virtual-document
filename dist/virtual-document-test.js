"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_class_1 = require("./virtual-document-class");
const virtual_document_demo_class_1 = require("./virtual-document-demo-class");
const virtual_document_enum_1 = require("./virtual-document-enum");
describe('@CustomDocument', () => {
    const testElementTag = virtual_document_enum_1.ElementTag.DIV;
    const testElementId = 'test_id';
    const testElementRootId = 'root';
    const testElementInnerText = 'test-inner-text';
    const testAttributeKey = 'test-key';
    const testAttributeValue = 'test-value';
    describe('#constructor', () => {
        test('expects new instance without entry to be an empty document', () => {
            const virtualDom = new virtual_document_class_1.VirtualDocument();
            const { elementCollection: { length } } = virtualDom.findElementsByTagNameInDoc({ tagName: 'body' });
            expect(length).toBe(0);
        });
        test('expects new instance with entry to have a body', () => {
            const doc = new Document();
            const html = doc.createElement('html');
            const body = doc.createElement('body');
            html.append(body);
            doc.append(html);
            const virtualDom = new virtual_document_class_1.VirtualDocument({ doc });
            const { elementCollection: { length } } = virtualDom.findElementsByTagNameInDoc({ tagName: 'body' });
            expect(length).toBe(1);
        });
    });
    describe('#makeElement', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expects to create a new element with "${testElementTag}" as tagName`, () => {
            const { element: { tagName } } = virtualDom.createNewElement({ tagName: testElementTag });
            expect(tagName).toBe(testElementTag);
        });
        test('expects an error when trying to create an element with an empty string for its tagName', () => {
            let elementTagName;
            try {
                const { element: { tagName } } = virtualDom.createNewElement({ tagName: '' });
                elementTagName = tagName;
            }
            catch (_a) {
                elementTagName = 'error';
            }
            expect(elementTagName).toBe('error');
        });
    });
    describe('#appendToDoc', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expect document to have an element with "${testElementTag}" tagName and "${testElementId}" id`, () => {
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtual_document_class_1.VirtualDocument.setId({ element, identifier: testElementId });
            virtualDom.appendToDoc({
                element
            });
            const { element: { tagName, id: elementId } } = virtualDom.findElementById({ elementId: testElementId });
            expect(tagName).toBe(testElementTag);
            expect(elementId).toBe(testElementId);
        });
    });
    describe('$#append', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expect main tag to have a element with "${testElementTag}" tagName`, () => {
            const { element: mainElement } = virtualDom.createNewElement({ tagName: virtual_document_enum_1.ElementTag.MAIN });
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtual_document_class_1.VirtualDocument.append({
                appendTo: mainElement,
                element
            });
            const { elementCollection: { length } } = virtual_document_class_1.VirtualDocument.findElementsByTagName({
                element: mainElement,
                tagName: testElementTag
            });
            expect(length).toBe(1);
        });
        test(`expect main tag to have an innerHTML with "${testElementInnerText}" value`, () => {
            const { element } = virtualDom.createNewElement({ tagName: virtual_document_enum_1.ElementTag.MAIN });
            virtual_document_class_1.VirtualDocument.append({
                appendTo: element,
                element: testElementInnerText
            });
            const { innerHTML: elementInnerHtml } = element;
            expect(elementInnerHtml).toBe(testElementInnerText);
        });
        test('expect main tag to have an innerHTML with empty value', () => {
            const { element: mainElement } = virtualDom.createNewElement({ tagName: virtual_document_enum_1.ElementTag.MAIN });
            virtual_document_class_1.VirtualDocument.append({
                appendTo: mainElement,
                element: ''
            });
            const { innerHTML } = mainElement;
            expect(innerHTML).toBe('');
        });
    });
    describe('$#setId', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expects element to have an id with "${testElementId}" value`, () => {
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtual_document_class_1.VirtualDocument.setId({ element, identifier: testElementId });
            const { id: elementId } = element;
            expect(elementId).toBe(testElementId);
        });
    });
    describe('$#setInnerHtml', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expects element to have an "${testElementInnerText}" as its innerHTML`, () => {
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtual_document_class_1.VirtualDocument.setInnerHtml({ element, innerHtml: testElementInnerText });
            const { innerHTML } = element;
            expect(innerHTML).toBe(testElementInnerText);
        });
    });
    describe('$#setAttribute', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expects element to have an attribute with "${testAttributeKey}" key and "${testAttributeValue}" value`, () => {
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtual_document_class_1.VirtualDocument.setAttribute({
                attributeKey: testAttributeKey,
                attributeValue: testAttributeValue,
                element
            });
            expect(element.getAttribute(testAttributeKey)).toBe(testAttributeValue);
        });
    });
    describe('$#findAttribute', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expects element to have an attribute with "${testAttributeKey}" key and "${testAttributeValue}" value`, () => {
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            element.setAttribute(testAttributeKey, testAttributeValue);
            const { isFound, attributeValue } = virtual_document_class_1.VirtualDocument.findAttribute({
                attributeKey: testAttributeKey,
                element
            });
            expect(isFound).toBeTruthy();
            expect(attributeValue).toBe(testAttributeValue);
        });
        test('expects element to not found the attribute', () => {
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            const { isFound, attributeValue } = virtual_document_class_1.VirtualDocument.findAttribute({
                attributeKey: testAttributeKey,
                element
            });
            expect(isFound).toBeFalsy();
            expect(attributeValue).toBe('');
        });
    });
    describe('$#replaceElements', () => {
        let virtualDom;
        let virtualDomDemo;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
            virtualDomDemo = new virtual_document_demo_class_1.VirtualDocumentDemo({ virtualDocument: virtualDom });
        });
        test(`expects an element with "${testElementRootId}" id to be replaced with another element with "${testElementId}" id`, () => {
            virtualDomDemo.createBase();
            const { element: newElementToReplace } = virtualDom.createNewElement({
                tagName: testElementTag
            });
            const { element: rootElement } = virtualDom.findElementById({
                elementId: testElementRootId
            });
            const { elementCollection: { 0: { children: { 0: elementChild } } } } = virtualDom.findElementsByTagNameInDoc({
                tagName: 'body'
            });
            const { id: bodyElementIDBeforeReplacement } = elementChild;
            virtual_document_class_1.VirtualDocument.setId({
                element: newElementToReplace,
                identifier: testElementId
            });
            virtual_document_class_1.VirtualDocument.replaceElements({
                replaceableElement: newElementToReplace,
                sourceElement: rootElement
            });
            const { elementCollection: { 0: { children: { 0: elementChildAfterReplacement } } } } = virtualDom.findElementsByTagNameInDoc({
                tagName: 'body'
            });
            const { id: bodyElementIDAfterReplacement } = elementChildAfterReplacement;
            expect(bodyElementIDBeforeReplacement).toBe(testElementRootId);
            expect(bodyElementIDAfterReplacement).toBe(testElementId);
        });
    });
    describe('#findElementById', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expects to find an element with "${testElementTag}" tagName and "${testElementId}" id`, () => {
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtual_document_class_1.VirtualDocument.setId({ element, identifier: testElementId });
            virtualDom.appendToDoc({ element });
            const { isFound, element: { tagName, id: identifier } } = virtualDom.findElementById({ elementId: testElementId });
            expect(isFound).toBeTruthy();
            expect(tagName).toBe(testElementTag);
            expect(identifier).toBe(testElementId);
        });
        test(`expect to not find any element with "${testElementId}" id`, () => {
            const { isFound, element: { tagName, id: identifier } } = virtualDom.findElementById({ elementId: testElementId });
            expect(isFound).toBeFalsy();
            expect(tagName).toBeUndefined();
            expect(identifier).toBeUndefined();
        });
        test('expect to not find any element with empty id', () => {
            const { isFound, element: { tagName, id: identifier } } = virtualDom.findElementById({ elementId: '' });
            expect(isFound).toBeFalsy();
            expect(tagName).toBeUndefined();
            expect(identifier).toBeUndefined();
        });
    });
    describe('$#getParentElement', () => {
        let virtualDom;
        const mainElementTag = virtual_document_enum_1.ElementTag.MAIN;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expects the parent element of "${testElementTag}" element to be an element with  tagName`, () => {
            const { element: parentElement } = virtualDom.createNewElement({ tagName: mainElementTag });
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtual_document_class_1.VirtualDocument.setId({ element, identifier: testElementId });
            virtual_document_class_1.VirtualDocument.append({ appendTo: parentElement, element });
            virtualDom.appendToDoc({ element: parentElement });
            const { element: childElement } = virtualDom.findElementById({ elementId: testElementId });
            const { isFound, parentElement: { tagName } } = virtual_document_class_1.VirtualDocument.getParentElement({ element: childElement });
            expect(isFound).toBeTruthy();
            expect(tagName).toBe(mainElementTag);
        });
        test(`expects to not find "${testElementId}" element's parent`, () => {
            const { element } = virtualDom.findElementById({ elementId: testElementId });
            const { isFound, parentElement: { tagName } } = virtual_document_class_1.VirtualDocument.getParentElement({ element });
            expect(isFound).toBeFalsy();
            expect(tagName).toBeUndefined();
        });
    });
    describe('#findElementsByTagNameInDoc', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expects to find an element with "${testElementTag}" tagName in the document`, () => {
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtualDom.appendToDoc({ element });
            const { elementCollection: { length } } = virtualDom.findElementsByTagNameInDoc({ tagName: testElementTag });
            expect(length).toBe(1);
        });
    });
    describe('$#findElementsByTagName', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expects to find an element with "${testElementTag}" tagName in the main element`, () => {
            const { element: parentElement } = virtualDom.createNewElement({ tagName: virtual_document_enum_1.ElementTag.MAIN });
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtual_document_class_1.VirtualDocument.append({ appendTo: parentElement, element });
            virtualDom.appendToDoc({ element: parentElement });
            const { elementCollection: { length } } = virtual_document_class_1.VirtualDocument.findElementsByTagName({
                element: parentElement,
                tagName: testElementTag
            });
            expect(length).toBe(1);
        });
    });
    describe('#findElementsByQuery', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expects to find an element with "${testElementTag}#${testElementId}" as query`, () => {
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtual_document_class_1.VirtualDocument.setId({ element, identifier: testElementId });
            virtualDom.appendToDoc({
                element
            });
            const { isFound, element: { tagName, id: identifier } } = virtualDom.findFirstElementByQuery({
                query: `${testElementTag}#${testElementId}`
            });
            expect(isFound).toBeTruthy();
            expect(tagName.toLowerCase()).toBe(testElementTag);
            expect(identifier).toBe(testElementId);
        });
        test('expects to not find any element with wrong query', () => {
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtual_document_class_1.VirtualDocument.setId({ element, identifier: testElementId });
            const { isFound, element: foundElement } = virtualDom.findFirstElementByQuery({
                query: `${testElementTag}#not_test_id`
            });
            expect(isFound).toBeFalsy();
            expect(foundElement).toEqual({});
        });
    });
    describe('#exportDocument', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test(`expects to find element with "${testElementId}" id of  exported document`, () => {
            const { element } = virtualDom.createNewElement({ tagName: testElementTag });
            virtual_document_class_1.VirtualDocument.setId({ element, identifier: testElementId });
            virtualDom.appendToDoc({ element });
            const { doc } = virtualDom.exportDocument();
            expect(doc.getElementById(testElementId)).not.toBeNull();
        });
    });
});
