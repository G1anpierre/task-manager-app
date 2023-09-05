import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {NewtaskProvider} from './provider/NewTaskProvider.tsx'
import {NewTask} from './components/NewTask.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {LogInPage} from './components/LogInPage.tsx'
import {ProtectedRoute} from './components/ProtectedRoute.tsx'
import {SignUpPage} from './components/SignUpPage.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const user = true

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute user={user}>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LogInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NewtaskProvider>
        <RouterProvider router={router} />
        <NewTask />
      </NewtaskProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
