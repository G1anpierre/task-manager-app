import classNames from 'classnames'
import {State} from '../types'
import {CreatorUserType} from '../hooks/useGetCreatorTask'

type StatusLabelType = {
  state: State
  userData?: CreatorUserType
}

export const StatusLabel = ({state, userData}: StatusLabelType) => {
  const statusLabel = classNames(
    'text-white py-0.5 px-1.5 rounded-lg self-end justify-self-end flex gap-1',
    {
      'bg-mantis-500': state === 'COMPLETED',
      'bg-warning': state === 'DOING',
      'bg-danger': state === 'PLANNED',
    },
  )

  return (
    <div className={statusLabel}>
      {userData ? (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-400">
          <span className="text-xs font-medium leading-none text-white">
            {userData?.name.substring(0, 1).toUpperCase()}
          </span>
        </span>
      ) : null}
      <span>{state}</span>
    </div>
  )
}
