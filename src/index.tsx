import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from 'components/layout/Home';

import { store } from './store';
import 'styles/style.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Notifications />
      <Home />
    </Provider>
  </QueryClientProvider>
);
