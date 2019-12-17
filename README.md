# Emails Editor

[Heroku Link](https://emails-editor.herokuapp.com/)

This project is designed to be a small library for adding a modal to an existing application for sharing content to a set of email addresses. It uses TypeScript, Webpack for the build pipeline, and a simplified bespoke DOM rendering and state management setup. The production bundle size is ~30KB and could be much smaller.

## API

The modal component can be controlled via `Window` with the following API:

### `EmailsEditor`
`({ container: Element, initialList: string[] }) => Editor`

| Name | Type | Description
| - | - | - |
| `container` | `Element` | A container DOM Element that is the target of the modal render
| `initialList` | `string[]` | An array of strings containing the initial emails to render

### `Editor`
`Object`

| Name | Type |
| - | - |
| `getEmailList` | `() => string[]`
| `setEmailList` | `(emailList: string[]) => void`
| `subscribeToEmailList` | `((pl: string[], cl: string[]) => void) => void`


The `index.html` file contains an example script that runs the following:

```javascript
const container = document.querySelector("#emails-editor");

const editor = EmailsEditor({ container, initialList: ["jford8820@gmail.com"] });
editor.subscribeToEmailList(function(previousList, currentList) {
  console.log(`Previous List: ${previousList}. Current List: ${currentList}.`);
});

const list = editor.getEmailList();
list.push("foo@bar.com");
editor.setEmailList(list);
```

## Commands

First run `npm install` and then `npm run ${command}`

### build

This is a vanilla webpack build. The results are saved in `dist/emails-editor.js`

### start

This opens a `connect` web server with `gzip` support on port 3000

### start:dev

A Webpack server for development that includes Redux logging

### type-check

Runs the TypeScript compiler to check static types without emitting files

### type-check:watch

Same as the above command, except that it will also watch for file changes