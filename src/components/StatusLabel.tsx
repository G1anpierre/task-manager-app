import classNames from 'classnames'
import {State} from '../types'

export const StatusLabel = ({state}: {state: State}) => {
  const statusLabel = classNames(
    'text-white p-1 rounded-lg self-end justify-self-end bg-mantis-500',
    {
      'bg-mantis-500': state === 'PLANNED',
      'bg-warning': state === 'DOING',
      'bg-danger': state === 'COMPLETED',
    },
  )

  return <span className={statusLabel}>{state}</span>
}
