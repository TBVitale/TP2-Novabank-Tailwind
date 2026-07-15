import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'; // <-- Corregido (sin la 't')
import { router } from './routes/Router';          // <-- Corregido (con llaves '{}')
import { BankProvider } from './context/BankContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BankProvider>
      <RouterProvider router={router} />
    </BankProvider>
  </StrictMode>
);