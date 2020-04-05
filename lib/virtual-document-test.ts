/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { VirtualDocument } from './virtual-document-class';
import { VirtualDocumentDemo } from './virtual-document-demo-class';
import { ElementTag } from './virtual-document-enum';

describe('@CustomDocument', (): void => {
  describe('#constructor', (): void => {
    test('virtualDom without entry document should be an empty document', (): void => {
      const virtualDom: VirtualDocument = new VirtualDocument();
      const {
        elementCollection: { length }
      } = virtualDom.findElementsByTagNameInDoc({ tagName: 'body' });

      expect(length).toBe(0);
    });

    test('virtualDom with non-empty entry document should be an empty document', (): void => {
      const doc: Document = new Document();
      const html: HTMLElement = doc.createElement('html');
      const body: HTMLElement = doc.createElement('body');
      html.append(body);
      doc.append(html);

      const virtualDom: VirtualDocument = new VirtualDocument({ doc });
      const {
        elementCollection: { length }
      } = virtualDom.findElementsByTagNameInDoc({ tagName: 'body' });

      expect(length).toBe(1);
    });
  });

  describe('#makeElement', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test('make element should create a new element in this virtual dom', (): void => {
      const {
        element: { tagName }
      } = virtualDom.makeElement({ tagName: ElementTag.DIV });

      expect(tagName).toBe('div');
    });

    test('make element with empty tagName should cause an error', (): void => {
      let elementTagName: string;

      try {
        const {
          element: { tagName }
        } = virtualDom.makeElement({ tagName: '' });
        elementTagName = tagName;
      } catch {
        elementTagName = 'error';
      }
      expect(elementTagName).toBe('error');
    });
  });

  describe('#appendToDoc', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test('append an element to virtualDom', (): void => {
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.setId({ source: element, identifier: 'test_id' });
      virtualDom.appendToDoc({
        element
      });

      const {
        element: { tagName }
      } = virtualDom.findElementById({ identifier: 'test_id' });

      expect(tagName).toBe('div');
    });
  });

  describe('$#append', (): void => {
    let virtualDom: VirtualDocument;
    beforeEach((): void => {
      virtualDom = new VirtualDocument();
    });

    test('append an element to element', (): void => {
      const { element: source } = virtualDom.makeElement({ tagName: ElementTag.MAIN });
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.append({
        source,
        element
      });
      const {
        elementCollection: { length }
      } = VirtualDocument.findElementsByTagName({
        source,
        tagName: 'div'
      });

      expect(length).toBe(1);
    });

    test('append an string to element', (): void => {
      const { element: source } = virtualDom.makeElement({ tagName: ElementTag.MAIN });
      const element: string = 'inner-element';
      VirtualDocument.append({
        source,
        element
      });
      const { innerHTML } = source;

      expect(innerHTML).toBe('inner-element');
    });

    test('append an empty string to element', (): void => {
      const { element: source } = virtualDom.makeElement({ tagName: ElementTag.MAIN });
      const element: string = '';
      VirtualDocument.append({
        source,
        element
      });
      const { innerHTML } = source;

      expect(innerHTML).toBe('');
    });
  });

  describe('$#setId', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test('setId to an element', (): void => {
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.setId({ source: element, identifier: 'test_id' });
      // eslint-disable-next-line id-length
      const { id: elementId } = element;

      expect(elementId).toBe('test_id');
    });
  });

  describe('$#setInnerHtml', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test('setId to an element', (): void => {
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.setInnerHtml({ source: element, innerHtml: 'test_text' });
      const { innerHTML } = element;

      expect(innerHTML).toBe('test_text');
    });
  });

  describe('$#setAttribute', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test('set attribute to an element', (): void => {
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.setAttribute({
        sourceElement: element,
        attributeKey: 'test-key',
        attributeValue: 'test-value'
      });

      expect(element.getAttribute('test-key')).toBe('test-value');
    });
  });

  describe('$#findAttribute', (): void => {
    let virtualDom: VirtualDocument;
    beforeEach((): void => {
      virtualDom = new VirtualDocument();
    });

    test('find attribute to an element', (): void => {
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.setAttribute({
        sourceElement: element,
        attributeKey: 'test-key',
        attributeValue: 'test-value'
      });
      const { isFound, attributeValue } = VirtualDocument.findAttribute({
        sourceElement: element,
        attributeKey: 'test-key'
      });

      expect(isFound).toBeTruthy();
      expect(attributeValue).toBe('test-value');
    });

    test('find attribute to an element', (): void => {
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      const { isFound, attributeValue } = VirtualDocument.findAttribute({
        sourceElement: element,
        attributeKey: 'test-key'
      });

      expect(isFound).toBeFalsy();
      expect(attributeValue).toBe('');
    });
  });

  describe('$#replaceElements', (): void => {
    let virtualDom: VirtualDocument;
    let virtualDomDemo: VirtualDocumentDemo;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
      virtualDomDemo = new VirtualDocumentDemo({ virtualDocument: virtualDom });
    });

    test('replace element with new element', (): void => {
      virtualDomDemo.createBase();
      const { element: newElementToReplace } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      const { element: rootElement } = virtualDom.findElementById({ identifier: 'root' });
      const {
        elementCollection: {
          0: {
            children: { 0: elementChild }
          }
        }
      } = virtualDom.findElementsByTagNameInDoc({
        tagName: 'body'
      });
      // eslint-disable-next-line id-length
      const { id: bodyElementIDBeforeReplacement } = elementChild;

      VirtualDocument.setId({
        source: newElementToReplace,
        identifier: 'test_id'
      });
      VirtualDocument.replaceElements({
        sourceElement: rootElement,
        replaceableElement: newElementToReplace
      });
      const {
        elementCollection: {
          0: {
            children: { 0: elementChildAfterReplacement }
          }
        }
      } = virtualDom.findElementsByTagNameInDoc({
        tagName: 'body'
      });
      // eslint-disable-next-line id-length
      const { id: bodyElementIDAfterReplacement } = elementChildAfterReplacement;

      expect(bodyElementIDBeforeReplacement).toBe('root');
      expect(bodyElementIDAfterReplacement).toBe('test_id');
    });
  });

  describe('#findElementById', (): void => {
    let virtualDom: VirtualDocument;
    beforeEach((): void => {
      virtualDom = new VirtualDocument();
    });

    test('testing find element by its id for an existing element', (): void => {
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.setId({ source: element, identifier: 'test_id' });
      virtualDom.appendToDoc({ element });
      const {
        isFound,
        // eslint-disable-next-line id-length
        element: { tagName, id: identifier }
      } = virtualDom.findElementById({ identifier: 'test_id' });

      expect(isFound).toBeTruthy();
      expect(tagName).toBe('div');
      expect(identifier).toBe('test_id');
    });

    test('testing find element by its id for not existed element', (): void => {
      const {
        isFound,
        // eslint-disable-next-line id-length
        element: { tagName, id: identifier }
      } = virtualDom.findElementById({ identifier: 'test_id' });

      expect(isFound).toBeFalsy();
      expect(tagName).toBeUndefined();
      expect(identifier).toBeUndefined();
    });

    test('testing find element by its id for empty id', (): void => {
      const {
        isFound,
        // eslint-disable-next-line id-length
        element: { tagName, id: identifier }
      } = virtualDom.findElementById({ identifier: '' });

      expect(isFound).toBeFalsy();
      expect(tagName).toBeUndefined();
      expect(identifier).toBeUndefined();
    });
  });

  describe('$#getParentElement', (): void => {
    let virtualDom: VirtualDocument;
    beforeEach((): void => {
      virtualDom = new VirtualDocument();
    });

    test('find parent element by its child id for existed id', (): void => {
      const { element: parentElement } = virtualDom.makeElement({ tagName: ElementTag.MAIN });
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.setId({ source: element, identifier: 'test_id' });
      VirtualDocument.append({ source: parentElement, element });
      virtualDom.appendToDoc({ element: parentElement });

      const { element: childElement } = virtualDom.findElementById({ identifier: 'test_id' });
      const {
        isFound,
        parentElement: { tagName }
      } = VirtualDocument.getParentElement({ element: childElement });

      expect(isFound).toBeTruthy();
      expect(tagName).toBe('main');
    });

    test('find parent element by its child id for not existed id', (): void => {
      const { element } = virtualDom.findElementById({ identifier: 'test_id' });
      const {
        isFound,
        parentElement: { tagName }
      } = VirtualDocument.getParentElement({ element });

      expect(isFound).toBeFalsy();
      expect(tagName).toBeUndefined();
    });
  });

  describe('#findElementsByTagNameInDoc', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test('find an element from main doc by its tag name', (): void => {
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      virtualDom.appendToDoc({ element });

      const {
        elementCollection: { length }
      } = virtualDom.findElementsByTagNameInDoc({ tagName: 'div' });

      expect(length).toBe(1);
    });
  });

  describe('$#findElementsByTagName', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test('find an element from another by its tag name', (): void => {
      const { element: parentElement } = virtualDom.makeElement({ tagName: ElementTag.MAIN });
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.append({ source: parentElement, element });
      virtualDom.appendToDoc({ element: parentElement });

      const {
        elementCollection: { length }
      } = VirtualDocument.findElementsByTagName({
        source: parentElement,
        tagName: 'div'
      });

      expect(length).toBe(1);
    });
  });

  describe('#findElementsByQuery', (): void => {
    let virtualDom: VirtualDocument;
    beforeEach((): void => {
      virtualDom = new VirtualDocument();
    });

    test('find an element with query', (): void => {
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.setId({ source: element, identifier: 'test_id' });
      virtualDom.appendToDoc({
        element
      });
      const {
        isFound,
        foundElement: {
          tagName,
          // eslint-disable-next-line id-length
          id: identifier
        }
      } = virtualDom.findFirstElementByQuery({
        query: 'div#test_id'
      });

      expect(isFound).toBeTruthy();
      expect(tagName.toLowerCase()).toBe('div');
      expect(identifier).toBe('test_id');
    });

    test('could not find an element with query', (): void => {
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.setId({ source: element, identifier: 'test_id' });
      const { isFound, foundElement } = virtualDom.findFirstElementByQuery({
        query: 'div#not_test_id'
      });

      expect(isFound).toBeFalsy();
      expect(foundElement).toEqual({});
    });
  });

  describe('#exportDocument', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test('export document', (): void => {
      const { element } = virtualDom.makeElement({ tagName: ElementTag.DIV });
      VirtualDocument.setId({ source: element, identifier: 'test_id' });
      virtualDom.appendToDoc({ element });

      const { doc } = virtualDom.exportDocument();

      expect(doc.getElementById('test_id')).not.toBeNull();
    });
  });
});
