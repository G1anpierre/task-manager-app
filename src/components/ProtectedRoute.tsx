import {Navigate} from 'react-router-dom'
import {getUser} from '../helper/localStorage'

type ProtectedRouteProps = {
  user: boolean
  redirectPath?: string
  children: React.ReactNode
}

export const ProtectedRoute = ({
  redirectPath = '/login',
  children,
}: ProtectedRouteProps) => {
  const token = getUser()
  if (!token) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
