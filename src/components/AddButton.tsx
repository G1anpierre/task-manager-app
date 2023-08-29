import classNames from 'classnames'
import {SquarePlus} from '../Icons/SquarePlus'
import {State} from '../types'

export const AddButton = ({
  onClick,
  state,
}: {
  onClick: () => void
  state: State
}) => {
  const addButtonClass = classNames(
    'text-white p-2 rounded-t-lg justify-self-end hover:bg-mantis-600 active:bg-mantis-700 focus:oultine-none focus:ring focus:ring-mantis-300 block m-auto',
    {
      'bg-mantis-500': state === 'COMPLETED',
      'bg-warning': state === 'DOING',
      'bg-danger': state === 'PLANNED',
    },
  )

  return (
    <button onClick={onClick} className={addButtonClass}>
      <SquarePlus />
    </button>
  )
}
