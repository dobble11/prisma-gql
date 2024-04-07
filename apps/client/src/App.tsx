import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './shared/globalStyle.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { getToken } from './shared/token';

const withLoginCheck = (element: React.ReactElement) => {
  const WithLoginCheckComponent: React.ComponentType = () => {
    if (getToken()) {
      return element;
    }

    return <Navigate to="/login" replace />;
  };

  return <WithLoginCheckComponent />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: withLoginCheck(<Home />),
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
