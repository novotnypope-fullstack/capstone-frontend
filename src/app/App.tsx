import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { DataProvider } from './context/DataContext';
import { router } from './routes';

export default function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </DataProvider>
  );
}
