import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {NewtaskProvider} from './provider/NewTaskProvider.tsx'
import {NewTask} from './components/NewTask.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NewtaskProvider>
      <App />
      <NewTask />
    </NewtaskProvider>
  </React.StrictMode>,
)
