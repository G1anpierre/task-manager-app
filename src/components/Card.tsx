import {useState} from 'react'
import {useDeleteTask} from '../hooks/useDeleteTask'
import {useStore} from '../store'
import {DeleteTaskRequestType, Task} from '../types'
import {DeleteButton} from './DeleteButton'
import {StatusLabel} from './StatusLabel'
import {useClickOutside} from '../hooks/useClickOutside'
import classNames from 'classnames'

export const Card = ({card}: {card: Task}) => {
  const deleteMutate = useDeleteTask()
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

  const handleSave = () => {
    console.log('handle save', {
      title: editTask.title,
      description: editTask.description,
    })
  }

  const handleEditTask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEditTask({
      ...editTask,
      [e.target.name]: e.target.value,
    })
  }

  const titleClass = classNames(
    'text-xl font-bold text-left hover:cursor-pointer',
    {
      'text-mantis-600': hover,
    },
  )

  const descriptionClass = classNames('text-sm hover:cursor-pointer', {
    'text-mantis-600': hover,
  })

  return (
    <div
      onDragStart={() => setDraggedTask(card)}
      draggable
      className="cursor-move border-2 border-mantis-400 bg-mantis-200 text-currentColor  h-40 rounded-lg grid gap-1 grid-rows-[auto_minmax(50px,_1fr)_auto] p-2 relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={ref}
    >
      <DeleteButton
        onClick={() => handleDelete({id: card.id, status: card.status})}
      />
      {edit ? (
        <input
          type="text"
          name="title"
          className="font-black block w-3/4 rounded-md border-0 p-1.5 text-mantis-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={editTask.title}
          onChange={handleEditTask}
        />
      ) : (
        <h2 className={titleClass} onDoubleClick={() => setEdit(true)}>
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
        />
      ) : (
        <p className={descriptionClass} onDoubleClick={() => setEdit(true)}>
          {card.description}
        </p>
      )}
      <div className="flex justify-between items-center">
        <StatusLabel state={card.status} />
        <div className="flex gap-1">
          {edit && (
            <button
              className="text-white py-0.5 px-1.5 rounded-lg bg-black hover:bg-danger"
              onClick={handleSave}
            >
              Save
            </button>
          )}
          {hover ? (
            <button
              className="text-white py-0.5 px-1.5 rounded-lg bg-mantis-600 hover:bg-mantis-800"
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
