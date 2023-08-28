import React, {createContext, useContext, useState} from 'react'
import {State} from '../types'

export type ContextType = {
  isOpen: boolean
  state: State | null
  onOpen: (state: State) => void
  onClose: () => void
}

export type useStateType = {
  isOpen: boolean
  state: State | null
}

const NewTaskContext = createContext<undefined | ContextType>(undefined)

export const NewtaskProvider = ({children}: {children: React.ReactNode}) => {
  const [state, setState] = useState<useStateType>({isOpen: false, state: null})

  return (
    <NewTaskContext.Provider
      value={{
        ...state,
        onOpen: (state: State) => setState({isOpen: true, state}),
        onClose: () => setState({isOpen: false, state: null}),
      }}
    >
      {children}
    </NewTaskContext.Provider>
  )
}

export const useNewTask = () => {
  const context = useContext(NewTaskContext)

  if (context === undefined) {
    throw new Error('useNewTask must be used within a NewTaskProvider')
  }

  return context
}
