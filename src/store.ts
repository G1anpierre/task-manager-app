import {create} from 'zustand'
import {State, Store} from './types'

export const useStore = create<Store>(set => ({
  cards: [
    {
      id: '1',
      title: 'Example Title 1',
      description: 'Example Description 1',
      state: 'PLANNED',
    },
    {
      id: '2',
      title: 'Example Title 2',
      description: 'Example Description 2',
      state: 'DOING',
    },
    {
      id: '3',
      title: 'Example Title 3',
      description: 'Example Description 3',
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
