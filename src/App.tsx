import './App.css'
import {Section} from './components/Section'

function App() {
  return (
    <div className="container h-screen">
      <h1 className="text-3xl font-bold underline mb-3">My Trello</h1>
      <div className="grid grid-cols-3 gap-8 h-2/4">
        <Section state="PLANNED" />
        <Section state="DOING" />
        <Section state="COMPLETED" />
      </div>
    </div>
  )
}

export default App
