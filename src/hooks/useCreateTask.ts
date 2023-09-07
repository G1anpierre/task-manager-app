import axios from 'axios'
import {getUser} from '../helper/localStorage'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {CreateTaskRequestType} from '../types'

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
