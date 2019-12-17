import { MaybeState, Store } from './types';

import App from './components/App';
import createStore from './store';
import { dom } from './utils';

declare global {
  interface Window { EmailsEditor: typeof EmailsEditor | undefined; }
}

type Props = {
  container: Element;
  initialList: string[];
};

const EmailsEditor = ({ container, initialList }: Props): Store => {
  const state: MaybeState = initialList ? { list: initialList, currentEmail: '' } : null;
  const store: Store = createStore(state);
  // The store's subscriptions work by chaining proxies on the store's state.
  // We aren't using a library like React, so we can't rely on magic re-rendering.
  // Instead, we subscribe internally and then use that handler to trigger re-rendering.
  // This works because the only 'stateful' prop we are passing around is the list from the store.
  const rootElement = () => <App store={store}/>;

  let root = rootElement();
  let previousRoot;
  container.appendChild(root);
  store.subscribeToEmailList(() => {
    previousRoot = root;
    root = rootElement();
    container.insertBefore(root, previousRoot);
    container.removeChild(previousRoot);
  });

  return store;
};

window.EmailsEditor = EmailsEditor;

export default EmailsEditor;