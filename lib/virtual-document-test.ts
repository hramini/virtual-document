/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { VirtualDocument } from './virtual-document-class';
import { VirtualDocumentDemo } from './virtual-document-demo-class';
import { ElementTag } from './virtual-document-enum';

describe('@CustomDocument', (): void => {
  const testElementTag: ElementTag = ElementTag.DIV;
  const testElementId: string = 'test_id';
  const testElementRootId: string = 'root';
  const testElementInnerText: string = 'test-inner-text';
  const testAttributeKey: string = 'test-key';
  const testAttributeValue: string = 'test-value';

  describe('#constructor', (): void => {
    test('expects new instance without entry to be an empty document', (): void => {
      const virtualDom: VirtualDocument = new VirtualDocument();
      const {
        elementCollection: { length }
      } = virtualDom.findElementsByTagNameInDoc({ tagName: 'body' });

      expect(length).toBe(0);
    });

    test('expects new instance with entry to have a body', (): void => {
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

    test(`expects to create a new element with "${testElementTag}" as tagName`, (): void => {
      const {
        element: { tagName }
      } = virtualDom.createNewElement({ tagName: testElementTag });

      expect(tagName).toBe(testElementTag);
    });

    test('expects an error when trying to create an element with an empty string for its tagName', (): void => {
      let elementTagName: string;

      try {
        const {
          element: { tagName }
        } = virtualDom.createNewElement({ tagName: '' });
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

    test(`expect document to have an element with "${testElementTag}" tagName and "${testElementId}" id`, (): void => {
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      VirtualDocument.setId({ element, identifier: testElementId });
      virtualDom.appendToDoc({
        element
      });

      const {
        // eslint-disable-next-line id-length
        element: { tagName, id: elementId }
      } = virtualDom.findElementById({ elementId: testElementId });

      expect(tagName).toBe(testElementTag);
      expect(elementId).toBe(testElementId);
    });
  });

  describe('$#append', (): void => {
    let virtualDom: VirtualDocument;
    beforeEach((): void => {
      virtualDom = new VirtualDocument();
    });

    test(`expect main tag to have a element with "${testElementTag}" tagName`, (): void => {
      const { element: mainElement } = virtualDom.createNewElement({ tagName: ElementTag.MAIN });
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      VirtualDocument.append({
        appendTo: mainElement,
        element
      });
      const {
        elementCollection: { length }
      } = VirtualDocument.findElementsByTagName({
        element: mainElement,
        tagName: testElementTag
      });

      expect(length).toBe(1);
    });

    test(`expect main tag to have an innerHTML with "${testElementInnerText}" value`, (): void => {
      const { element } = virtualDom.createNewElement({ tagName: ElementTag.MAIN });
      VirtualDocument.append({
        appendTo: element,
        element: testElementInnerText
      });
      const { innerHTML: elementInnerHtml } = element;

      expect(elementInnerHtml).toBe(testElementInnerText);
    });

    test('expect main tag to have an innerHTML with empty value', (): void => {
      const { element: mainElement } = virtualDom.createNewElement({ tagName: ElementTag.MAIN });
      VirtualDocument.append({
        appendTo: mainElement,
        element: ''
      });
      const { innerHTML } = mainElement;

      expect(innerHTML).toBe('');
    });
  });

  describe('$#setId', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test(`expects element to have an id with "${testElementId}" value`, (): void => {
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      VirtualDocument.setId({ element, identifier: testElementId });
      // eslint-disable-next-line id-length
      const { id: elementId } = element;

      expect(elementId).toBe(testElementId);
    });
  });

  describe('$#setInnerHtml', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test(`expects element to have an "${testElementInnerText}" as its innerHTML`, (): void => {
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      VirtualDocument.setInnerHtml({ element, innerHtml: testElementInnerText });
      const { innerHTML } = element;

      expect(innerHTML).toBe(testElementInnerText);
    });
  });

  describe('$#setAttribute', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test(`expects element to have an attribute with "${testAttributeKey}" key and "${testAttributeValue}" value`, (): void => {
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      VirtualDocument.setAttribute({
        attributeKey: testAttributeKey,
        attributeValue: testAttributeValue,
        element
      });

      expect(element.getAttribute(testAttributeKey)).toBe(testAttributeValue);
    });
  });

  describe('$#findAttribute', (): void => {
    let virtualDom: VirtualDocument;
    beforeEach((): void => {
      virtualDom = new VirtualDocument();
    });

    test(`expects element to have an attribute with "${testAttributeKey}" key and "${testAttributeValue}" value`, (): void => {
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      element.setAttribute(testAttributeKey, testAttributeValue);
      const { isFound, attributeValue } = VirtualDocument.findAttribute({
        attributeKey: testAttributeKey,
        element
      });

      expect(isFound).toBeTruthy();
      expect(attributeValue).toBe(testAttributeValue);
    });

    test('expects element to not found the attribute', (): void => {
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      const { isFound, attributeValue } = VirtualDocument.findAttribute({
        attributeKey: testAttributeKey,
        element
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

    test(`expects an element with "${testElementRootId}" id to be replaced with another element with "${testElementId}" id`, (): void => {
      virtualDomDemo.createBase();
      const { element: newElementToReplace } = virtualDom.createNewElement({
        tagName: testElementTag
      });
      const { element: rootElement } = virtualDom.findElementById({
        elementId: testElementRootId
      });
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
        element: newElementToReplace,
        identifier: testElementId
      });
      VirtualDocument.replaceElements({
        replaceableElement: newElementToReplace,
        sourceElement: rootElement
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

      expect(bodyElementIDBeforeReplacement).toBe(testElementRootId);
      expect(bodyElementIDAfterReplacement).toBe(testElementId);
    });
  });

  describe('#findElementById', (): void => {
    let virtualDom: VirtualDocument;
    beforeEach((): void => {
      virtualDom = new VirtualDocument();
    });

    test(`expects to find an element with "${testElementTag}" tagName and "${testElementId}" id`, (): void => {
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      VirtualDocument.setId({ element, identifier: testElementId });
      virtualDom.appendToDoc({ element });
      const {
        isFound,
        // eslint-disable-next-line id-length
        element: { tagName, id: identifier }
      } = virtualDom.findElementById({ elementId: testElementId });

      expect(isFound).toBeTruthy();
      expect(tagName).toBe(testElementTag);
      expect(identifier).toBe(testElementId);
    });

    test(`expect to not find any element with "${testElementId}" id`, (): void => {
      const {
        isFound,
        // eslint-disable-next-line id-length
        element: { tagName, id: identifier }
      } = virtualDom.findElementById({ elementId: testElementId });

      expect(isFound).toBeFalsy();
      expect(tagName).toBeUndefined();
      expect(identifier).toBeUndefined();
    });

    test('expect to not find any element with empty id', (): void => {
      const {
        isFound,
        // eslint-disable-next-line id-length
        element: { tagName, id: identifier }
      } = virtualDom.findElementById({ elementId: '' });

      expect(isFound).toBeFalsy();
      expect(tagName).toBeUndefined();
      expect(identifier).toBeUndefined();
    });
  });

  describe('$#getParentElement', (): void => {
    let virtualDom: VirtualDocument;
    const mainElementTag: ElementTag = ElementTag.MAIN;
    beforeEach((): void => {
      virtualDom = new VirtualDocument();
    });

    test(`expects the parent element of "${testElementTag}" element to be an element with  tagName`, (): void => {
      const { element: parentElement } = virtualDom.createNewElement({ tagName: mainElementTag });
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      VirtualDocument.setId({ element, identifier: testElementId });
      VirtualDocument.append({ appendTo: parentElement, element });
      virtualDom.appendToDoc({ element: parentElement });

      const { element: childElement } = virtualDom.findElementById({ elementId: testElementId });
      const {
        isFound,
        parentElement: { tagName }
      } = VirtualDocument.getParentElement({ element: childElement });

      expect(isFound).toBeTruthy();
      expect(tagName).toBe(mainElementTag);
    });

    test(`expects to not find "${testElementId}" element's parent`, (): void => {
      const { element } = virtualDom.findElementById({ elementId: testElementId });
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

    test(`expects to find an element with "${testElementTag}" tagName in the document`, (): void => {
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      virtualDom.appendToDoc({ element });
      const {
        elementCollection: { length }
      } = virtualDom.findElementsByTagNameInDoc({ tagName: testElementTag });

      expect(length).toBe(1);
    });
  });

  describe('$#findElementsByTagName', (): void => {
    let virtualDom: VirtualDocument;
    beforeAll((): void => {
      virtualDom = new VirtualDocument();
    });

    test(`expects to find an element with "${testElementTag}" tagName in the main element`, (): void => {
      const { element: parentElement } = virtualDom.createNewElement({ tagName: ElementTag.MAIN });
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      VirtualDocument.append({ appendTo: parentElement, element });
      virtualDom.appendToDoc({ element: parentElement });

      const {
        elementCollection: { length }
      } = VirtualDocument.findElementsByTagName({
        element: parentElement,
        tagName: testElementTag
      });

      expect(length).toBe(1);
    });
  });

  describe('#findElementsByQuery', (): void => {
    let virtualDom: VirtualDocument;
    beforeEach((): void => {
      virtualDom = new VirtualDocument();
    });

    test(`expects to find an element with "${testElementTag}#${testElementId}" as query`, (): void => {
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      VirtualDocument.setId({ element, identifier: testElementId });
      virtualDom.appendToDoc({
        element
      });
      const {
        isFound,
        element: {
          tagName,
          // eslint-disable-next-line id-length
          id: identifier
        }
      } = virtualDom.findFirstElementByQuery({
        query: `${testElementTag}#${testElementId}`
      });

      expect(isFound).toBeTruthy();
      expect(tagName.toLowerCase()).toBe(testElementTag);
      expect(identifier).toBe(testElementId);
    });

    test('expects to not find any element with wrong query', (): void => {
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      VirtualDocument.setId({ element, identifier: testElementId });
      const { isFound, element: foundElement } = virtualDom.findFirstElementByQuery({
        query: `${testElementTag}#not_test_id`
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

    test(`expects to find element with "${testElementId}" id of  exported document`, (): void => {
      const { element } = virtualDom.createNewElement({ tagName: testElementTag });
      VirtualDocument.setId({ element, identifier: testElementId });
      virtualDom.appendToDoc({ element });
      const { doc } = virtualDom.exportDocument();

      expect(doc.getElementById(testElementId)).not.toBeNull();
    });
  });
});
