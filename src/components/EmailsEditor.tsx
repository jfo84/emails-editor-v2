import { dom, validateEmail } from '../utils';
import { Store } from '../types';

import './EmailsEditor.css';

type Props = { store: Store; };

const EmailsEditor = ({ store }: Props) => {
  const list = store.getEmailList();
  const { currentEmail } = store._state;

  const handleInput = (event: Event): void => {
    if (event.target instanceof HTMLInputElement) {
      store._setCurrentEmail(event.target.value);
    }
  };

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.target instanceof HTMLInputElement) {
      const { code, target: { value } } = event;

      if (code === 'Comma' || code === 'Enter') {
        // The change event has likely not fired yet, so we use the target value and
        // remove the 'Comma' from the value
        const strippedEmail = (code === 'Comma')
          ? value.substring(0, value.length - 1)
          : value;
        store._addEmail(strippedEmail);
        store._setCurrentEmail('');
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

      store._addEmail(event.target.value);
      store._setCurrentEmail('');
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
