import {create} from 'zustand'
import {State, Store} from './types'

export const useStore = create<Store>(set => ({
  cards: [
    {id: '1', title: 'Card 1', description: 'Description 1', state: 'PLANNED'},
    {id: '2', title: 'Card 2', description: 'Description 2', state: 'DOING'},
    {id: '4', title: 'Card 4', description: 'Description 4', state: 'DOING'},
    {id: '5', title: 'Card 5', description: 'Description 5', state: 'DOING'},
    {id: '6', title: 'Card 6', description: 'Description 6', state: 'DOING'},
    {
      id: '3',
      title: 'Card 3',
      description: 'Description 3',
      state: 'COMPLETED',
    },
  ],
  removeCard: (id: string) =>
    set(store => ({
      cards: store.cards.filter(card => card.id !== id),
    })),
  addCard: (title: string, description: string, state: State) =>
    set(store => ({
      cards: [
        ...store.cards,
        {
          id: String(Math.floor(Math.random() * 100000)),
          title,
          description,
          state,
        },
      ],
    })),
  draggedTask: null,
  setDraggedTask: (title: string) => set({draggedTask: title}),
  moveTask: (title: string, state: State) =>
    set(store => ({
      cards: store.cards.map(card =>
        card.title === title ? {...card, title, state} : card,
      ),
    })),
}))
