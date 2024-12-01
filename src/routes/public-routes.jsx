import { Navigate } from 'react-router-dom'

import LoginPage from '../pages/login'

export const publicRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <Navigate to="/login" replace /> },
]
