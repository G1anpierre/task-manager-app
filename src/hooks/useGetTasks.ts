import {useQuery} from '@tanstack/react-query'
import axios, {AxiosResponse} from 'axios'
import {getUser} from '../helper/localStorage'
import {z} from 'zod'
import {State, StateList} from '../types'

const taskSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(StateList),
  userId: z.string(),
})

export const tasksSchema = z.array(taskSchema)

export type Task = z.infer<typeof taskSchema>

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

  const {data, isLoading, isError} = useQuery(['tasks', {state}], getTasks)
  let validatedTasks: Task[] = []
  try {
    validatedTasks = tasksSchema.parse(data?.data.data)
  } catch (e) {
    console.error(e)
  }
  return {validatedTasks, isLoading, isError}
}
