export type State = 'PLANNED' | 'DOING' | 'COMPLETED'

export type Card = {
  id: string
  title: string
  description: string
  state: State
}

export type Store = {
  cards: Card[]
  removeCard: (id: string) => void
  addCard: (title: string, description: string, state: State) => void
  draggedTask: string | null
  setDraggedTask: (title: string) => void
  moveTask: (title: string, state: State) => void
}
