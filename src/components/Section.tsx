import {useState} from 'react'
import {useStore} from '../store'
import {AddButton} from './AddButton'
import {Card} from './Card'
import {State} from '../types'
import {useNewTask} from '../provider/NewTaskProvider'
import classNames from 'classnames'
import useTaskList from '../hooks/useGetTasks'
import {useMoveTask} from '../hooks/useMoveTask'

export const Section = ({state}: {state: State}) => {
  const [drop, setDrop] = useState(false)
  const {data, isLoading} = useTaskList(state)
  const {draggedTaskId} = useStore(store => store)
  const moveTask = useMoveTask()
  const {onOpen} = useNewTask()

  const sectionClass = classNames(
    'border-2 p-2 rounded-lg h-[800px] flex flex-col gap-2 overflow-y-scroll no-scrollbar',
    {
      'border-mantis-500': state === 'COMPLETED',
      'border-warning': state === 'DOING',
      'border-danger': state === 'PLANNED',
      'border-transparent outline-dashed': drop,
    },
  )

  return (
    <div>
      <AddButton onClick={() => onOpen(state)} state={state} />
      <div
        className={sectionClass}
        onDrop={e => {
          setDrop(false)
          e.preventDefault()
          moveTask.mutate({id: draggedTaskId, status: state})
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
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data?.map(card => <Card key={card.id} card={card} />)
        )}
      </div>
    </div>
  )
}
