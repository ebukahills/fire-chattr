import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import App from './components/App';
import registerServiceWorker from './serviceWorkers/registerServiceWorker';

// Import custom CSS
import './assets/main.css';

// connected-react-router Step 2
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store/createStore';

// Initialize Redux Store
import configureStore from './store/createStore';
var store = configureStore();

// Export store for other components to have acces to dispatch
// https://stackoverflow.com/questions/38460949/what-is-the-best-way-to-access-re
// dux-store-outside-a-react-component
export default store;

ReactDOM.render(
	<Provider store={ store }>
   <BrowserRouter>
     <ConnectedRouter history={ history }>
       <App/>
     </ConnectedRouter>
   </BrowserRouter>
 </Provider>, document.getElementById('root'));
registerServiceWorker();
