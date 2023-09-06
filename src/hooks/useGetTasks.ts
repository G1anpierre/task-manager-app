import {useQuery} from '@tanstack/react-query'
import axios, {AxiosResponse} from 'axios'
import {getUser} from '../helper/localStorage'
import {State, Task, tasksSchema} from '../types'

export default function useTaskList(state: State) {
  const getTasks = async (): Promise<AxiosResponse<{data: {data: Task[]}}>> => {
    const response = axios.get(
      `${import.meta.env.VITE_API_URL}/api/tasks/${state}`,
      {
        headers: {
          Authorization: `Bearer ${getUser()}`,
        },
      },
    )
    return response
  }

  const {data, isLoading, isError, isSuccess} = useQuery(
    ['tasks', {state}],
    getTasks,
  )
  let validatedTasks: Task[] = []
  try {
    if (isSuccess) {
      validatedTasks = tasksSchema.parse(data?.data.data)
    }
  } catch (e) {
    console.error(e)
  }
  return {validatedTasks, isLoading, isError}
}
