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
}
