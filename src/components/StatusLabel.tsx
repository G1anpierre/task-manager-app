import classNames from 'classnames'
import {State} from '../types'

export const StatusLabel = ({state}: {state: State}) => {
  const statusLabel = classNames(
    'text-white p-1 rounded-lg self-end justify-self-end',
    {
      'bg-mantis-500': state === 'COMPLETED',
      'bg-warning': state === 'DOING',
      'bg-danger': state === 'PLANNED',
    },
  )

  return <span className={statusLabel}>{state}</span>
}
