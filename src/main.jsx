import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Customers from './components/Customers.jsx';
import Trainings from './components/Trainings.jsx';

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
    <RouterProvider router={router} />
  </React.StrictMode>,
)

