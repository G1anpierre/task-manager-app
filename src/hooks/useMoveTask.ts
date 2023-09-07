import axios from 'axios'
import {getUser} from '../helper/localStorage'
import {useMutation, useQueryClient} from '@tanstack/react-query'

export const useMoveTask = () => {
  const queryClient = useQueryClient()
  const moveTask = ({id, status}: {id: string | null; status: string}) => {
    const url = `${import.meta.env.VITE_API_URL}/api/task/${id}`
    const data = {status}
    const headers = {
      Authorization: `Bearer ${getUser()}`,
    }

    const response = axios.put(url, data, {headers})
    return response
  }

  const mutate = useMutation({
    mutationFn: moveTask,
    onSuccess: ({data}) => {
      console.log('data :', data)
    },
    onSettled: (data, error) => {
      if (error) {
        console.error(error)
      }
      queryClient.invalidateQueries(['tasks'])
    },
  })

  return mutate
}
