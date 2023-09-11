import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {getUser} from '../helper/localStorage'
import {z} from 'zod'

export const CreatorUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
})

export type CreatorUserType = z.infer<typeof CreatorUserSchema>

export const useGetCreatorTask = (id: string) => {
  const creatorTask = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/usercard/${id}`
      const headers = {
        Authorization: `Bearer ${getUser()}`,
      }
      const {data} = await axios.get(url, {headers})
      const validatedUser = await CreatorUserSchema.parse(data.data)
      return validatedUser
    } catch (e) {
      console.error(e)
    }
  }

  const creatorTaskQuery = useQuery(['user', {id}], creatorTask)
  return creatorTaskQuery
}
