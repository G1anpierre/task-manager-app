import axios from 'axios'
import {getUser} from '../helper/localStorage'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {CreateTaskRequestType, Task, Tasks} from '../types'

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const createTask = ({title, description, status}: CreateTaskRequestType) => {
    const url = `${import.meta.env.VITE_API_URL}/api/task`
    const data = {title, description, status: status}
    const headers = {
      Authorization: `Bearer ${getUser()}`,
    }

    const response = axios.post(url, data, {headers})
    return response
  }

  const mutate = useMutation({
    mutationFn: createTask,
    onMutate: async variables => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ['tasks', {state: variables.status}],
      })

      // Snapshot the previous value
      const previousTasksSnapShot = queryClient.getQueryData([
        'tasks',
        {state: variables.status},
      ])

      // Optimistically update to the new value
      const placeholderData: Task = {
        createdAt: new Date().toString(),
        description: variables.description,
        id: Math.random().toString(),
        status: variables.status,
        title: variables.title,
        // TODO Update with the right userId
        userId: Math.random().toString(),
      }
      queryClient.setQueryData(
        ['tasks', {state: variables.status}],
        (tasks?: Tasks) => tasks?.concat(placeholderData),
      )

      // Return a context object with the snapshotted value
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
