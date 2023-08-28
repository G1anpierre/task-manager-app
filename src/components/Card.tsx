import {useStore} from '../store'
import {DeleteButton} from './DeleteButton'
import {Card as CardType} from '../types'
import {StatusLabel} from './StatusLabel'

export const Card = ({card}: {card: CardType}) => {
  const removeCard = useStore(store => store.removeCard)
  const handleDelete = (id: string) => {
    removeCard(id)
  }

  return (
    <div className="border-2 border-mantis-400 bg-mantis-200 text-currentColor  h-40 rounded-lg grid grid-rows-[auto_minmax(50px,_1fr)_auto] p-2 relative">
      <DeleteButton onClick={() => handleDelete(card.id)} />
      <h2 className="text-xl font-bold text-left">{card.title}</h2>
      <p className="text-sm">{card.description}</p>
      <StatusLabel state={card.state} />
    </div>
  )
}
