import axios from 'axios'
import {getUser} from '../helper/localStorage'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {State, Tasks} from '../types'

type UpdateSaveEditProps = {
  id: string
  title: string
  description: string
  status: State
}

export const useUpdateSaveTask = () => {
  const queryClient = useQueryClient()
  const updateSaveEdit = ({id, title, description}: UpdateSaveEditProps) => {
    const url = `${import.meta.env.VITE_API_URL}/api/task/${id}/edit`
    const data = {title, description}
    const headers = {
      Authorization: `Bearer ${getUser()}`,
    }

    const response = axios.put(url, data, {headers})
    return response
  }

  const mutate = useMutation({
    mutationFn: updateSaveEdit,
    onMutate: async variables => {
      await queryClient.cancelQueries({
        queryKey: ['tasks', {state: variables.status}],
      })

      const previousTasksSnapShot = queryClient.getQueryData([
        'tasks',
        {state: variables.status},
      ])

      const placeholderData = {
        description: variables.description,
        title: variables.title,
      }

      queryClient.setQueryData(
        ['tasks', {state: variables.status}],
        (tasks?: Tasks) =>
          tasks?.map(task => {
            if (task.id === variables.id) {
              return {...task, ...placeholderData}
            } else {
              return task
            }
          }),
      )

      return {previousTasksSnapShot}
    },
    onSettled: (_, error, variables) => {
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
