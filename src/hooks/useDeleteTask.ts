import axios from 'axios'
import {getUser} from '../helper/localStorage'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {Tasks} from '../types'

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  const deleteTask = ({id}: {id: string; status?: string}) => {
    const url = `${import.meta.env.VITE_API_URL}/api/tasks/${id}`

    const headers = {
      Authorization: `Bearer ${getUser()}`,
    }

    const response = axios.delete(url, {headers})
    return response
  }

  const mutate = useMutation({
    mutationFn: deleteTask,
    onMutate: async variables => {
      await queryClient.cancelQueries({
        queryKey: ['tasks', {state: variables.status}],
      })

      // Snapshot the previous value
      const previousTasksSnapShot = queryClient.getQueryData([
        'tasks',
        {state: variables.status},
      ])

      queryClient.setQueryData(
        ['tasks', {state: variables.status}],
        (tasks?: Tasks) => tasks?.filter(task => task.id !== variables.id),
      )

      return {previousTasksSnapShot}
    },
    onSettled: (data, error, variables) => {
      if (error) {
        console.error(error)
      }
      queryClient.invalidateQueries(['tasks', {state: variables.status}])
    },
    onError: (error, variables, context) => {
      console.error('onError :', error)
      queryClient.setQueryData(
        ['tasks', {state: variables.status}],
        context?.previousTasksSnapShot,
      )
    },
  })

  return mutate
}
