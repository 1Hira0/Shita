import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Download from './pages/Download.tsx';

const router = createBrowserRouter([
  { path: "/", element: <App />/*, errorElement: <div>Error</div> */},
  { path: "/download/:site/:id", element: <Download /> },
  { path: "/about", element: <div>About</div> },
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
