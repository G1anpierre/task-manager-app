import {useDeleteTask} from '../hooks/useDeleteTask'
import {useStore} from '../store'
import {DeleteTaskRequestType, Task} from '../types'
import {DeleteButton} from './DeleteButton'
import {StatusLabel} from './StatusLabel'

export const Card = ({card}: {card: Task}) => {
  const deleteMutate = useDeleteTask()
  const {setDraggedTaskId} = useStore(store => store)
  const handleDelete = ({id, status}: DeleteTaskRequestType) => {
    deleteMutate.mutate({id, status})
  }

  const handleEdit = (type: string) => {
    console.log('edit title', type)
    console.log('card id :', card.id)
  }

  return (
    <div
      onDragStart={() => setDraggedTaskId(card.id)}
      draggable
      className="cursor-pointer border-2 border-mantis-400 bg-mantis-200 text-currentColor  h-40 rounded-lg grid grid-rows-[auto_minmax(50px,_1fr)_auto] p-2 relative"
    >
      <DeleteButton
        onClick={() => handleDelete({id: card.id, status: card.status})}
      />
      <h2
        className="text-xl font-bold text-left"
        onDoubleClick={() => handleEdit('title')}
      >
        {card.title}
      </h2>
      <p className="text-sm" onDoubleClick={() => handleEdit('description')}>
        {card.description}
      </p>
      <StatusLabel state={card.status} />
    </div>
  )
}
