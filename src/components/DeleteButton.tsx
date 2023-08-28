import {Trash} from '../Icons/Trash'

export const DeleteButton = ({onClick}: {onClick: () => void}) => {
  return (
    <button
      className="bg-danger text-white rounded-tr-lg rounded-bl-lg p-2 absolute top-0 right-0"
      onClick={onClick}
    >
      <Trash />
    </button>
  )
}
