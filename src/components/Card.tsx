import {useDeleteTask} from '../hooks/useDeleteTask'
import {useStore} from '../store'
import {Task} from '../types'
import {DeleteButton} from './DeleteButton'
import {StatusLabel} from './StatusLabel'

export const Card = ({card}: {card: Task}) => {
  const deleteMutate = useDeleteTask()
  const {setDraggedTask} = useStore(store => store)
  const handleDelete = (id: string) => {
    deleteMutate.mutate(id)
  }

  const handleEdit = (type: string) => {
    console.log('edit title', type)
    console.log('card id :', card.id)
  }

  return (
    <div
      onDragStart={() => setDraggedTask(card.id)}
      draggable
      className="cursor-pointer border-2 border-mantis-400 bg-mantis-200 text-currentColor  h-40 rounded-lg grid grid-rows-[auto_minmax(50px,_1fr)_auto] p-2 relative"
    >
      <DeleteButton onClick={() => handleDelete(card.id)} />
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
