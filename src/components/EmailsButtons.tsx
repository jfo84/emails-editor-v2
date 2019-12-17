import { Store } from '../types';
import { dom, randomWord } from '../utils';

import './EmailsButtons.css';

type Props = { store: Store; };

const EmailsButtons = ({ store }: Props) => {
  const emailCount = store.getEmailList().length;

  const handleAddClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLButtonElement) {
      const user = randomWord();
      const domain = randomWord();

      store._addEmail(`${user}@${domain}.com`);
    }
  };

  const handleCountClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLButtonElement) {
      window.alert(`The current email count is ${emailCount}`);
    }
  };

  return (
    <div class='emails-buttons-container'>
      <button
        class='add-button'
        onClick={handleAddClick}
      >
        Add email
      </button>
      <button
        class='count-button'
        onClick={handleCountClick}
      >
        Get emails count
      </button>
    </div>
  );
}

export default EmailsButtons;