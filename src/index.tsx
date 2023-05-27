import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import { Notifications } from '@mantine/notifications';

import Home from 'components/layout/Home';

import { store } from './store';
import 'styles/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <Notifications />
    <Home />
  </Provider>
);
