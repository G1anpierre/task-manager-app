import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {getUser} from '../helper/localStorage'
import {State, Tasks, tasksSchema} from '../types'

export default function useTaskList(state: State) {
  const getTasks = async (): Promise<Tasks> => {
    const {data} = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/tasks/${state}`,
      {
        headers: {
          Authorization: `Bearer ${getUser()}`,
        },
      },
    )
    const validatedTasks = await tasksSchema.parse(data.data)
    return validatedTasks
  }

  const queryTasks = useQuery(['tasks', {state}], getTasks)

  return queryTasks
}
