import { dom, validateEmail } from '../utils';
import { Store } from '../types';

import './EmailsEditor.css';

type Props = { store: Store; };

const EmailsEditor = ({ store }: Props) => {
  const list = store.getEmailList();
  const { currentEmail } = store._state;

  const handleInput = (event: InputEvent): void => {
    if (event.target instanceof HTMLInputElement) {
      if (event.data !== ',') {
        store._setCurrentEmail(event.target.value);
      }
    }
  };

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.target instanceof HTMLInputElement) {
      const { code, target } = event;

      if (code === 'Comma' || code === 'Enter') {
        store._addCurrentEmail();
      }
    }
  };

  const handlePaste = (event: ClipboardEvent): void => {
    if (event.target instanceof HTMLInputElement) {
      event.preventDefault();

      const emailListString = event.clipboardData!.getData('text/plain');
      const pastedEmails = emailListString.split(',').map(e => e.trim());
  
      pastedEmails.forEach(e => store._addEmail(e));
    }
  };

  const handleBlur = (event: FocusEvent): void => {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value === '') return;

      store._addCurrentEmail();
    }
  };

  return (
    <div class='emails-editor-container'>
      {list.map((email, index) => {
        const textClass = validateEmail(email)
          ? 'email-text'
          : 'email-text invalid';

        return (
          <div class='email-container'>
            <div class={textClass}>{email}</div>
            <div
              class='email-remove'
              onClick={() => store._removeEmail(index)}
            ></div>
          </div>
        );
      })}
      <input
        type='email'
        class='email-input'
        spellcheck={true}
        autofocus={true}
        placeholder='add more people...'
        value={currentEmail}
        onInput={handleInput}
        onKeyUp={handleKeyUp}
        onPaste={handlePaste}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default EmailsEditor;
