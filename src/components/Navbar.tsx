import {Link, useNavigate} from 'react-router-dom'
import {removeUser} from '../helper/localStorage'
import {Logo} from './Logo'
import {useStore} from '../store'

export const Navbar = () => {
  const navigate = useNavigate()
  const user = useStore(store => store.user)

  return (
    <nav className="mb-10">
      <div className="flex justify-between items-center h-16 bg-mantis-500 text-white ">
        <div className="flex items-center">
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/">
            <span className="text-xl font-bold ml-2">Task Manager App</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {/* <Link to="/login"> */}
          <span>Welcome, {user.email}</span>
          <button
            className="bg-white hover:bg-gray-100 text-mantis-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4"
            onClick={() => {
              removeUser()
              navigate('/login')
            }}
          >
            Log Out
          </button>
          {/* </Link> */}
        </div>
      </div>
    </nav>
  )
}
