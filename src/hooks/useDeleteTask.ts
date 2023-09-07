import axios from 'axios'
import {getUser} from '../helper/localStorage'
import {useMutation, useQueryClient} from '@tanstack/react-query'

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
    onSuccess: ({data}) => {
      // queryClient.invalidateQueries(['tasks', {state: data.data.status}])
      console.log('data :', data)
    },
    onSettled: (data, error, variables) => {
      if (error) {
        console.error(error)
      }
      queryClient.invalidateQueries(['tasks', {state: variables.status}])
    },
  })

  return mutate
}
