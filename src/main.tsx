import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import LoginPage from './pages/LoginPage';
import LaunchListPage from './pages/LaunchListPage';
import LaunchDetailPage from './pages/LaunchDetailPage';
import ProtectedLayout from './components/ProtectedLayout';

export const routes = [
	{
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: '/',
            element: <LaunchListPage />
          },
          {
            path: 'launches/:id',
            element: <LaunchDetailPage />
          }
        ]
      }
    ]
  }
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
