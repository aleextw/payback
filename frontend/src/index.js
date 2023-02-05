import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import CreateReceiptPage from './routes/CreateReceiptPage';
import ViewReceiptPage, { loader as viewReceiptLoader } from './routes/ViewReceiptPage';
import Base from './routes/Base';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Root />,
          },
          {
            path: "/create",
            element: <CreateReceiptPage />,
          },
          {
            path: "/view/:receiptId",
            element: <ViewReceiptPage />,
            loader: viewReceiptLoader,
          }
  
        ]
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
  </React.StrictMode>
);
