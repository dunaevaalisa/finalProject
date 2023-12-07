import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Customers from './components/Customers.jsx';
import Trainings from './components/Trainings.jsx';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';


const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Customers />,
        index:true
      },
      {
        path: "Trainings",
        element: <Trainings />,
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dropdown>
    <RouterProvider router={router} />
    </Dropdown>
  </React.StrictMode>,
)

