import axios from 'axios'
import {getUser} from '../helper/localStorage'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {State, Task} from '../types'

type MoveTaskProps = {
  card: Task
  moveToStatus: State
}

export const useMoveTask = () => {
  const queryClient = useQueryClient()
  const moveTask = ({card, moveToStatus}: MoveTaskProps) => {
    const url = `${import.meta.env.VITE_API_URL}/api/task/${card?.id}`
    const data = {status: moveToStatus}
    const headers = {
      Authorization: `Bearer ${getUser()}`,
    }

    const response = axios.put(url, data, {headers})
    return response
  }

  const mutate = useMutation({
    mutationFn: moveTask,
    onMutate: async variables => {
      await queryClient.cancelQueries({
        queryKey: ['tasks'],
      })

      // Snapshot the previous value
      const previousTasksSnapShot = queryClient.getQueryData(['tasks'])

      const placeholderData: Task = {
        ...variables.card,
        status: variables.moveToStatus,
      }

      queryClient.setQueryData(
        ['tasks', {state: variables.card?.status}],
        (tasks?: Task[]) => {
          return tasks?.filter(task => task.id !== variables.card?.id)
        },
      )

      queryClient.setQueryData(
        ['tasks', {state: variables.moveToStatus}],
        (tasks?: Task[]) => {
          return tasks?.concat(placeholderData)
        },
      )
      return {previousTasksSnapShot}
    },
    onSettled: (_, error) => {
      if (error) {
        console.error(error)
      }
      queryClient.invalidateQueries(['tasks'])
    },
    onError: (error, _, context) => {
      console.error('onError :', error)
      queryClient.setQueryData(['tasks'], context?.previousTasksSnapShot)
    },
  })

  return mutate
}
