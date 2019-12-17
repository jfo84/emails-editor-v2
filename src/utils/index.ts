import { TagFunction, Tag, Attributes } from '../types';
// Borrowed from random-words which borrowed from xkcd password generator which borrowed it from wherever
// @ts-ignore
import wordList from './words';

export const randomWord = (): string => wordList[Math.floor(Math.random() * wordList.length)];

export const deepCopy = (obj: any): any => JSON.parse(JSON.stringify(obj));

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const validateEmail = (email: string): boolean => emailRegex.test(email.toLowerCase());

const eventHandlerRegex = /on([A-Z])\w+/;

export const dom = (
  tag: Tag,
  attributes: Attributes,
  ...children: Element[]
): TagFunction | Element | void => {
  if (!tag) return;
  if (typeof tag === 'function') return tag(attributes);

  if (typeof tag === 'string') {
    
    // fragments to append multiple children to the initial node
    const fragments = document.createDocumentFragment();
    const element = document.createElement(tag);

    children.forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(e => fragments.appendChild(e));
      } else if (child instanceof Element) { 
         fragments.appendChild(child);
       } else if (typeof child === 'string') {
         const textnode = document.createTextNode(child);
         fragments.appendChild(textnode);
       }
    });
    element.appendChild(fragments);

    // Add classes and event listeners and merge the rest
    if (attributes && typeof attributes === 'object') {
      const filterAttributes = [];
      const className = attributes.class;

      if (typeof className === 'string') {
        const classes = className.split(' ').map(c => c.trim());
  
        classes.forEach(c => element.classList.add(c));
        filterAttributes.push('class');
      }

      const attributeKeys = Object.keys(attributes);
      const handlerAttributeKeys: string[] = attributeKeys.filter(a => eventHandlerRegex.test(a));

      handlerAttributeKeys.forEach(hak => {
        const eventName = hak.replace('on', '').toLowerCase();
        const handler: EventListener = attributes[hak];

        element.addEventListener(eventName, handler);
      });
  
      const newAttributes = deepCopy(attributes);
      delete newAttributes.class;
      Object.assign(element, attributes);
    }

    return element;
  }
}