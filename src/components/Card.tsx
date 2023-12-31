import {useState} from 'react'
import {useDeleteTask} from '../hooks/useDeleteTask'
import {useStore} from '../store'
import {DeleteTaskRequestType, Task} from '../types'
import {DeleteButton} from './DeleteButton'
import {StatusLabel} from './StatusLabel'
import {useClickOutside} from '../hooks/useClickOutside'
import classNames from 'classnames'
import {useUpdateSaveTask} from '../hooks/useUpdateSaveEdit'
import {useGetCreatorTask} from '../hooks/useGetCreatorTask'

export const Card = ({card}: {card: Task}) => {
  const user = useStore(store => store.user)

  const updateSaveMutate = useUpdateSaveTask()
  const deleteMutate = useDeleteTask()
  const {data} = useGetCreatorTask(card.userId)
  const {setDraggedTask} = useStore(store => store)
  const handleDelete = ({id, status}: DeleteTaskRequestType) => {
    deleteMutate.mutate({id, status})
  }
  const [edit, setEdit] = useState(false)
  const [hover, setHover] = useState(false)
  const [editTask, setEditTask] = useState({
    title: card.title,
    description: card.description,
  })

  const doThisOnClickOutside = () => {
    setEdit(false)
    setEditTask({
      title: card.title,
      description: card.description,
    })
  }
  const ref = useClickOutside(doThisOnClickOutside)

  const handleSave = async () => {
    await updateSaveMutate.mutate({
      id: card.id,
      title: editTask.title,
      description: editTask.description,
      status: card.status,
    })
    setEdit(false)
  }

  const areFieldsModified =
    card.title.trim() !== editTask.title.trim() ||
    card.description.trim() !== editTask.description.trim()

  const isCreatorOfTask = user.id === card.userId

  const handleEditTask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEditTask({
      ...editTask,
      [e.target.name]: e.target.value,
    })
  }

  const titleClass = classNames('text-xl font-bold text-left', {
    'text-mantis-600': hover,
    'hover:cursor-pointer': isCreatorOfTask,
    'opacity-25': !isCreatorOfTask,
  })

  const descriptionClass = classNames('text-sm', {
    'text-mantis-600': hover,
    'hover:cursor-pointer': isCreatorOfTask,
    'opacity-25': !isCreatorOfTask,
  })

  const cardClass = classNames(
    'border-2 border-mantis-400 bg-mantis-200 text-currentColor  h-40 rounded-lg grid gap-1 grid-rows-[auto_minmax(50px,_1fr)_auto] p-2 relative',
    {
      'bg-gray-100': !isCreatorOfTask,
      'cursor-move': isCreatorOfTask,
    },
  )

  return (
    <div
      onDragStart={() => isCreatorOfTask && setDraggedTask(card)}
      draggable={isCreatorOfTask}
      className={cardClass}
      onMouseEnter={() => isCreatorOfTask && setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={ref}
    >
      {hover && (
        <DeleteButton
          onClick={() =>
            !deleteMutate.isLoading &&
            handleDelete({id: card.id, status: card.status})
          }
        />
      )}
      {edit ? (
        <input
          type="text"
          name="title"
          className="font-black block w-3/4 rounded-md border-0 p-1.5 text-mantis-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={editTask.title}
          onChange={handleEditTask}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <h2
          className={titleClass}
          onDoubleClick={() => isCreatorOfTask && setEdit(true)}
        >
          {card.title}
        </h2>
      )}
      {edit ? (
        <textarea
          name="description"
          rows={4}
          value={editTask.description}
          onChange={handleEditTask}
          className="block w-full rounded-md border-0 p-1.5 text-mantis-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onKeyDown={e => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <p
          className={descriptionClass}
          onDoubleClick={() => isCreatorOfTask && setEdit(true)}
        >
          {card.description}
        </p>
      )}
      <div className="flex justify-between items-center">
        <StatusLabel state={card.status} userData={data} />
        <div className="grid grid-cols-[50px_50px] gap-1">
          {edit && areFieldsModified && (
            <button
              className="text-white py-0.5 px-1.5 rounded-lg bg-black hover:bg-danger col-start-1"
              onClick={handleSave}
            >
              Save
            </button>
          )}
          {hover ? (
            <button
              className="text-white py-0.5 px-1.5 rounded-lg bg-mantis-600 hover:bg-mantis-800 col-start-2"
              onClick={() => {
                setEditTask({
                  title: card.title,
                  description: card.description,
                })
                setEdit(!edit)
              }}
            >
              {edit ? 'Close' : 'Edit'}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
