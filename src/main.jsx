import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './layout/Root.jsx'
import Home from './Components/Home/Home.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import signUp from './Components/signUp/signUp.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    Component: Root,
    children: [
      {index: true, Component: Home},
      {path: '/login', Component: Login},
      {path: '/register', Component: Register},
      {path: '/signUp', Component: signUp}
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
