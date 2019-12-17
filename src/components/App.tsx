import { dom } from '../utils';
import { Store } from '../types';

import EmailsEditor from './EmailsEditor';
import EmailsButtons from './EmailsButtons';
import './App.css';

type Props = { store: Store; };

const App = ({ store }: Props) => (
  <div>
    <div class='modal'>
      <label class='bg-modal' for='modal'></label>
      <div class='inner-modal'>
        <div class='top-modal-section'>
          <h2 class='modal-title'>Share <b>Board name</b> with others</h2>
          <EmailsEditor store={store}/>
        </div>
        <div class='bottom-modal-section'>
          <EmailsButtons store={store}/>
        </div>
      </div>
    </div>
  </div>
);

export default App;
