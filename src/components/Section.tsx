import {useMemo, useState} from 'react'
import {useStore} from '../store'
import {AddButton} from './AddButton'
import {Card} from './Card'
import {State} from '../types'
import {useNewTask} from '../provider/NewTaskProvider'
import classNames from 'classnames'

export const Section = ({state}: {state: State}) => {
  const [drop, setDrop] = useState(false)
  const cards = useStore(store => store.cards)
  const {moveTask, draggedTask} = useStore(store => store)
  const {onOpen} = useNewTask()

  const filteredCards = useMemo(
    () => cards?.filter(card => card.state === state),
    [cards, state],
  )

  const sectionClass = classNames(
    'border-2 p-2 rounded-lg h-full flex flex-col gap-2 overflow-y-scroll',
    {
      'border-mantis-500': state === 'PLANNED',
      'border-warning': state === 'DOING',
      'border-danger': state === 'COMPLETED',
      'border-mantis-900': drop,
    },
  )

  return (
    <div className="h-full">
      <AddButton onClick={() => onOpen(state)} state={state} />
      <div
        className={sectionClass}
        onDrop={e => {
          setDrop(false)
          e.preventDefault()
          moveTask(draggedTask as string, state)
        }}
        onDragOver={e => {
          setDrop(true)
          e.preventDefault()
        }}
        onDragLeave={e => {
          setDrop(false)
          e.preventDefault()
        }}
      >
        {filteredCards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}
