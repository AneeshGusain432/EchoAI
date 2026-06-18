import { createRoot } from 'react-dom/client'
import "@fontsource-variable/geist";
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen'
import { GoogleOAuthProvider } from '@react-oauth/google'
import QueryProvider from './utils/QueryProvider.jsx';
import { Toaster } from "react-hot-toast";

const router = createRouter({ routeTree })

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <QueryProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </QueryProvider>
  </GoogleOAuthProvider>

)
