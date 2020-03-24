"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtual_document_class_1 = require("./virtual-document-class");
describe('@CustomDocument', () => {
    describe('#constructor', () => {
        let virtualDom;
        test('virtualDom without entry document should be an empty document', () => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
            const { elementCollection } = virtualDom.findElementsByTagName({ tagName: 'body' });
            expect(elementCollection.length).toBe(0);
        });
        test('virtualDom with non-empty entry document should be an empty document', () => {
            const doc = new Document();
            const html = doc.createElement('html');
            const body = doc.createElement('body');
            html.append(body);
            doc.append(html);
            virtualDom = new virtual_document_class_1.VirtualDocument({ doc });
            const { elementCollection } = virtualDom.findElementsByTagName({ tagName: 'body' });
            expect(elementCollection.length).toBe(1);
        });
    });
    describe('#createBase', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
            virtualDom.createBase();
        });
        test('we should have an element with root id in this virtualDom', () => {
            const { element } = virtualDom.findElementById({ id: 'root' });
            expect(element.tagName).toBe('div');
        });
        test('the parent element of root element should be body in this virtualDom', () => {
            const { element } = virtualDom.findParentElementByChildId({ id: 'root' });
            expect(element.tagName).toBe('body');
        });
    });
    describe('#makeElement', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('make element should create an empty element when tagName is empty in this virtual dom', () => {
            const { element } = virtualDom.makeElement({ tagName: '' });
            expect(element.tagName).toBeUndefined();
        });
        test('make element should create a new element in this virtual dom', () => {
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            expect(element.tagName).toBe('test-element');
        });
    });
    describe('#append', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('append an element virtualDom', () => {
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.setId({ source: element, id: 'test_id' });
            virtualDom.append({
                element
            });
            const { element: foundElement } = virtualDom.findElementById({ id: 'test_id' });
            expect(foundElement.tagName).toBe('test-element');
        });
        test('append an element to doc', () => {
            const doc = new Document();
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.append({
                source: doc,
                element
            });
            expect(doc.getElementsByTagName('test-element').length).toBe(1);
        });
        test('append an element to element', () => {
            const { element: source } = virtualDom.makeElement({ tagName: 'source-element' });
            const { element } = virtualDom.makeElement({ tagName: 'inner-element' });
            virtualDom.append({
                source,
                element
            });
            expect(source.getElementsByTagName('inner-element').length).toBe(1);
        });
    });
    describe('#appendString', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('append an string to element', () => {
            const { element: source } = virtualDom.makeElement({ tagName: 'source-element' });
            const text = 'inner-element';
            virtualDom.appendString({
                source,
                text
            });
            expect(source.innerHTML).toBe('inner-element');
        });
        test('append an string to element', () => {
            const { element: source } = virtualDom.makeElement({ tagName: 'source-element' });
            const text = '';
            virtualDom.appendString({
                source,
                text
            });
            expect(source.innerHTML).toBe('');
        });
    });
    describe('#setId', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('setId to an element', () => {
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.setId({ source: element, id: 'test_id' });
            expect(element.id).toBe('test_id');
        });
    });
    describe('#setAttribute', () => {
        let virtualDom;
        beforeAll(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('set attribute to an element', () => {
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.setAttribute({
                sourceElement: element,
                attributeKey: 'test-key',
                attributeValue: 'test-value'
            });
            expect(element.getAttribute('test-key')).toBe('test-value');
        });
    });
    describe('#findAttribute', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('find attribute to an element', () => {
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.setAttribute({
                sourceElement: element,
                attributeKey: 'test-key',
                attributeValue: 'test-value'
            });
            const { isFound, attributeValue } = virtualDom.findAttribute({
                sourceElement: element,
                attributeKey: 'test-key'
            });
            expect(isFound).toBeTruthy();
            expect(attributeValue).toBe('test-value');
        });
        test('find attribute to an element', () => {
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            const { isFound, attributeValue } = virtualDom.findAttribute({
                sourceElement: element,
                attributeKey: 'test-key'
            });
            expect(isFound).toBeFalsy();
            expect(attributeValue).toBe('');
        });
    });
    describe('#replaceElements', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
            virtualDom.createBase();
        });
        test('replace element with new element', () => {
            const { element: newElementToReplace } = virtualDom.makeElement({ tagName: 'test-element' });
            const { element: rootElement } = virtualDom.findElementById({ id: 'root' });
            const { elementCollection } = virtualDom.findElementsByTagName({
                tagName: 'body'
            });
            const { id: bodyElementIDBeforeReplacement } = elementCollection[0].children[0];
            virtualDom.setId({
                source: newElementToReplace,
                id: 'test_id'
            });
            virtualDom.replaceElements({
                sourceElement: rootElement,
                replaceableElement: newElementToReplace
            });
            expect(bodyElementIDBeforeReplacement).toBe('root');
            expect(elementCollection[0].children[0].id).toBe('test_id');
        });
    });
    describe('#findElementById', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('testing find element by its id for an existing element', () => {
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.setId({ source: element, id: 'test_id' });
            virtualDom.append({ element });
            const { isFound, element: foundElement } = virtualDom.findElementById({ id: 'test_id' });
            expect(isFound).toBeTruthy();
            expect(foundElement.tagName).toBe('test-element');
            expect(foundElement.id).toBe('test_id');
        });
        test('testing find element by its id for not existed element', () => {
            const { isFound, element } = virtualDom.findElementById({ id: 'test_id' });
            expect(isFound).toBeFalsy();
            expect(element.tagName).toBeUndefined();
            expect(element.id).toBeUndefined();
        });
        test('testing find element by its id for empty id', () => {
            const { isFound, element } = virtualDom.findElementById({ id: '' });
            expect(isFound).toBeFalsy();
            expect(element.tagName).toBeUndefined();
            expect(element.id).toBeUndefined();
        });
    });
    describe('#findParentElementByChildId', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('find parent element by its child id for existed id', () => {
            const { element: parentElement } = virtualDom.makeElement({ tagName: 'test-parent-element' });
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.setId({ source: element, id: 'test_id' });
            virtualDom.append({ source: parentElement, element });
            virtualDom.append({ element: parentElement });
            const { element: foundElement } = virtualDom.findParentElementByChildId({ id: 'test_id' });
            expect(foundElement.tagName).toBe('test-parent-element');
        });
        test('find parent element by its child id for not existed id', () => {
            const { element: foundElement } = virtualDom.findParentElementByChildId({ id: 'test_id' });
            expect(foundElement.tagName).toBeUndefined();
        });
    });
    describe('#findElementsByTagName', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('find an element from main doc by its tag name', () => {
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.append({ element });
            const { elementCollection } = virtualDom.findElementsByTagName({ tagName: 'test-element' });
            expect(elementCollection.length).toBe(1);
        });
        test('find an element from another by its tag name', () => {
            const { element: parentElement } = virtualDom.makeElement({ tagName: 'test-parent-element' });
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.append({ source: parentElement, element });
            virtualDom.append({ element: parentElement });
            const { elementCollection } = virtualDom.findElementsByTagName({
                source: parentElement,
                tagName: 'test-element'
            });
            expect(elementCollection.length).toBe(1);
        });
    });
    describe('#findElementsByQuery', () => {
        let virtualDom;
        beforeEach(() => {
            virtualDom = new virtual_document_class_1.VirtualDocument();
        });
        test('find an element with query', () => {
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.setId({ source: element, id: 'test_id' });
            virtualDom.append({
                element
            });
            const { isFound, foundElement } = virtualDom.findFirstElementByQuery({
                query: 'test-element#test_id'
            });
            expect(isFound).toBeTruthy();
            expect(foundElement.tagName.toLowerCase()).toBe('test-element');
            expect(foundElement.id).toBe('test_id');
        });
        test('could not find an element with query', () => {
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.setId({ source: element, id: 'test_id' });
            const { isFound, foundElement } = virtualDom.findFirstElementByQuery({
                query: 'test-element#not_test_id'
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
            const { element } = virtualDom.makeElement({ tagName: 'test-element' });
            virtualDom.setId({ source: element, id: 'test_id' });
            virtualDom.append({ element });
            const { doc } = virtualDom.exportDocument();
            expect(doc.getElementById('test_id')).not.toBeNull();
        });
    });
});
