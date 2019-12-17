export type TagFunction = (attributes: {}) => TagFunction | Element | void;
export type Tag = string | TagFunction;
export type Attributes = {
  class?: string;
  [key: string]: any;
};

export type State = {
  list: string[];
  currentEmail: string;
  [key: string]: string | string[];
};

export type MaybeState = State | null;

export type SubscriptionCallback = (
  previousState: string | string[],
  currentState: string | string[],
) => any;

export type Store = {
  _state: State;
  _setState: (newState: State) => void;
  _setCurrentEmail: (currentEmail: string) => void;
  _removeEmail: (index: number) => void;
  _addEmail: (email: string) => void;
  _addCurrentEmail: () => void;
  getEmailList: () => string[];
  setEmailList: (emailList: string[]) => string[];
  subscribeToEmailList: (cb: SubscriptionCallback) => void;
};