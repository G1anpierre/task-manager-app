import {useEffect} from 'react'
import './App.css'
import {Navbar} from './components/Navbar'
import {Section} from './components/Section'
import {useStore} from './store'
import {getUserInfoFromToken} from './helper/localStorage'

function App() {
  const {setUser} = useStore(store => store)

  useEffect(() => {
    const user = getUserInfoFromToken()
    if (user) {
      setUser(user)
    }
  }, [setUser])

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 h-2/4">
          <Section state="PLANNED" />
          <Section state="DOING" />
          <Section state="COMPLETED" />
        </div>
      </div>
    </>
  )
}

export default App
