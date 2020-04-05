"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_class_1 = require("./virtual-document-class");
const virtual_document_demo_class_1 = require("./virtual-document-demo-class");
const virtual_document_enum_1 = require("./virtual-document-enum");
describe('@CustomDocument', () => {
    describe('#constructor', () => {
        test('virtualDom without entry document should be an empty document', () => {
            const virtualDom = new virtual_document_class_1.VirtualDocument();
            const { elementCollection: { length } } = virtualDom.findElementsByTagNameInDoc({ tagName: 'body' });
            expect(length).toBe(0);
        });
        test('virtualDom with non-empty entry document should be an empty document', () => {
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
        test('make element should create a new element in this virtual dom', () => {
            const { element: { tagName } } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            expect(tagName).toBe('div');
        });
        test('make element with empty tagName should cause an error', () => {
            let elementTagName;
            try {
                const { element: { tagName } } = virtualDom.makeElement({ tagName: '' });
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
        test('append an element to virtualDom', () => {
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.setId({ source: element, identifier: 'test_id' });
            virtualDom.appendToDoc({
                element
            });
            const { element: { tagName } } = virtualDom.findElementById({ identifier: 'test_id' });
            expect(tagName).toBe('div');
        });
    });
    describe('$#append', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('append an element to element', () => {
            const { element: source } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.MAIN });
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.append({
                source,
                element
            });
            const { elementCollection: { length } } = virtual_document_class_1.VirtualDocument.findElementsByTagName({
                source,
                tagName: 'div'
            });
            expect(length).toBe(1);
        });
        test('append an string to element', () => {
            const { element: source } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.MAIN });
            const element = 'inner-element';
            virtual_document_class_1.VirtualDocument.append({
                source,
                element
            });
            const { innerHTML } = source;
            expect(innerHTML).toBe('inner-element');
        });
        test('append an empty string to element', () => {
            const { element: source } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.MAIN });
            const element = '';
            virtual_document_class_1.VirtualDocument.append({
                source,
                element
            });
            const { innerHTML } = source;
            expect(innerHTML).toBe('');
        });
    });
    describe('$#setId', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('setId to an element', () => {
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.setId({ source: element, identifier: 'test_id' });
            const { id: elementId } = element;
            expect(elementId).toBe('test_id');
        });
    });
    describe('$#setInnerHtml', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('setId to an element', () => {
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.setInnerHtml({ source: element, innerHtml: 'test_text' });
            const { innerHTML } = element;
            expect(innerHTML).toBe('test_text');
        });
    });
    describe('$#setAttribute', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('set attribute to an element', () => {
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.setAttribute({
                sourceElement: element,
                attributeKey: 'test-key',
                attributeValue: 'test-value'
            });
            expect(element.getAttribute('test-key')).toBe('test-value');
        });
    });
    describe('$#findAttribute', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('find attribute to an element', () => {
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.setAttribute({
                sourceElement: element,
                attributeKey: 'test-key',
                attributeValue: 'test-value'
            });
            const { isFound, attributeValue } = virtual_document_class_1.VirtualDocument.findAttribute({
                sourceElement: element,
                attributeKey: 'test-key'
            });
            expect(isFound).toBeTruthy();
            expect(attributeValue).toBe('test-value');
        });
        test('find attribute to an element', () => {
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            const { isFound, attributeValue } = virtual_document_class_1.VirtualDocument.findAttribute({
                sourceElement: element,
                attributeKey: 'test-key'
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
        test('replace element with new element', () => {
            virtualDomDemo.createBase();
            const { element: newElementToReplace } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            const { element: rootElement } = virtualDom.findElementById({ identifier: 'root' });
            const { elementCollection: { 0: { children: { 0: elementChild } } } } = virtualDom.findElementsByTagNameInDoc({
                tagName: 'body'
            });
            const { id: bodyElementIDBeforeReplacement } = elementChild;
            virtual_document_class_1.VirtualDocument.setId({
                source: newElementToReplace,
                identifier: 'test_id'
            });
            virtual_document_class_1.VirtualDocument.replaceElements({
                sourceElement: rootElement,
                replaceableElement: newElementToReplace
            });
            const { elementCollection: { 0: { children: { 0: elementChildAfterReplacement } } } } = virtualDom.findElementsByTagNameInDoc({
                tagName: 'body'
            });
            const { id: bodyElementIDAfterReplacement } = elementChildAfterReplacement;
            expect(bodyElementIDBeforeReplacement).toBe('root');
            expect(bodyElementIDAfterReplacement).toBe('test_id');
        });
    });
    describe('#findElementById', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('testing find element by its id for an existing element', () => {
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.setId({ source: element, identifier: 'test_id' });
            virtualDom.appendToDoc({ element });
            const { isFound, element: { tagName, id: identifier } } = virtualDom.findElementById({ identifier: 'test_id' });
            expect(isFound).toBeTruthy();
            expect(tagName).toBe('div');
            expect(identifier).toBe('test_id');
        });
        test('testing find element by its id for not existed element', () => {
            const { isFound, element: { tagName, id: identifier } } = virtualDom.findElementById({ identifier: 'test_id' });
            expect(isFound).toBeFalsy();
            expect(tagName).toBeUndefined();
            expect(identifier).toBeUndefined();
        });
        test('testing find element by its id for empty id', () => {
            const { isFound, element: { tagName, id: identifier } } = virtualDom.findElementById({ identifier: '' });
            expect(isFound).toBeFalsy();
            expect(tagName).toBeUndefined();
            expect(identifier).toBeUndefined();
        });
    });
    describe('$#getParentElement', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('find parent element by its child id for existed id', () => {
            const { element: parentElement } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.MAIN });
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.setId({ source: element, identifier: 'test_id' });
            virtual_document_class_1.VirtualDocument.append({ source: parentElement, element });
            virtualDom.appendToDoc({ element: parentElement });
            const { element: childElement } = virtualDom.findElementById({ identifier: 'test_id' });
            const { isFound, parentElement: { tagName } } = virtual_document_class_1.VirtualDocument.getParentElement({ element: childElement });
            expect(isFound).toBeTruthy();
            expect(tagName).toBe('main');
        });
        test('find parent element by its child id for not existed id', () => {
            const { element } = virtualDom.findElementById({ identifier: 'test_id' });
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
        test('find an element from main doc by its tag name', () => {
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtualDom.appendToDoc({ element });
            const { elementCollection: { length } } = virtualDom.findElementsByTagNameInDoc({ tagName: 'div' });
            expect(length).toBe(1);
        });
    });
    describe('$#findElementsByTagName', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('find an element from another by its tag name', () => {
            const { element: parentElement } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.MAIN });
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.append({ source: parentElement, element });
            virtualDom.appendToDoc({ element: parentElement });
            const { elementCollection: { length } } = virtual_document_class_1.VirtualDocument.findElementsByTagName({
                source: parentElement,
                tagName: 'div'
            });
            expect(length).toBe(1);
        });
    });
    describe('#findElementsByQuery', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('find an element with query', () => {
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.setId({ source: element, identifier: 'test_id' });
            virtualDom.appendToDoc({
                element
            });
            const { isFound, foundElement: { tagName, id: identifier } } = virtualDom.findFirstElementByQuery({
                query: 'div#test_id'
            });
            expect(isFound).toBeTruthy();
            expect(tagName.toLowerCase()).toBe('div');
            expect(identifier).toBe('test_id');
        });
        test('could not find an element with query', () => {
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.setId({ source: element, identifier: 'test_id' });
            const { isFound, foundElement } = virtualDom.findFirstElementByQuery({
                query: 'div#not_test_id'
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
        test('export document', () => {
            const { element } = virtualDom.makeElement({ tagName: virtual_document_enum_1.ElementTag.DIV });
            virtual_document_class_1.VirtualDocument.setId({ source: element, identifier: 'test_id' });
            virtualDom.appendToDoc({ element });
            const { doc } = virtualDom.exportDocument();
            expect(doc.getElementById('test_id')).not.toBeNull();
        });
    });
});
