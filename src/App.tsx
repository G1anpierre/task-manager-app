import './App.css'

function App() {
  return (
    <div className="container h-screen">
      <h1 className="text-3xl font-bold underline mb-3">My Trello</h1>
      <div className="columns-3 gap-8 h-2/4">
        <Section state="PLANNED" />
        <Section state="DOING" />
        <Section state="COMPLETED" />
      </div>
    </div>
  )
}

export default App

const Section = ({state}: {state: string}) => {
  return (
    <div className="border-2 border-mantis-800 h-full p-2 rounded-lg">
      <Card state={state} />
    </div>
  )
}

const Card = ({state}: {state: string}) => {
  return (
    <div className="border-2 border-mantis-400 bg-mantis-200 text-currentColor  h-40 rounded-lg grid grid-rows-[auto_minmax(50px,_1fr)_auto] p-2">
      <h2 className="text-xl font-bold text-left">Card title</h2>
      <p className="text-sm">Card description</p>
      <StatusLabel state={state} />
    </div>
  )
}

const StatusLabel = ({state}: {state: string}) => {
  return (
    <span className="bg-mantis-500 text-white p-1 rounded-lg self-end justify-self-end">
      {state}
    </span>
  )
}
