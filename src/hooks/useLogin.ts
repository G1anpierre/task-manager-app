import {useMutation} from '@tanstack/react-query'
import axios, {AxiosResponse} from 'axios'
import {useNavigate} from 'react-router-dom'
import {saveUser} from '../helper/localStorage'

interface ResponseData {
  token: string
}

export const useAuthenticate = (type: 'login' | 'signup') => {
  const navigate = useNavigate()
  const mutate = useMutation<
    AxiosResponse<ResponseData>,
    unknown,
    {
      name?: string
      email: string
      password: string
    },
    unknown
  >({
    mutationFn: loginData => {
      return axios.post(`${import.meta.env.VITE_API_URL}/${type}`, loginData)
    },
    onSuccess: async data => {
      await saveUser(data.data.token)
      navigate('/')
    },
    onError: error => {
      console.log('error :', error)
    },
  })

  return mutate
}
