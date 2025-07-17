import { api } from '@/lib/axios'
import { isAxiosError } from 'axios'
import type { NavigateFunction } from 'react-router-dom'

export const authenticatorInterceptor = (navigate: NavigateFunction) => {
  return api.interceptors.response.use(
    (response) => response,
    (error) => {
      //isAxiosError will get the correct error typing
      if (isAxiosError(error)) {
        //Get the information
        const status = error.response?.status
        const code = error.response?.data.code
        //condition to the automatic redirection
        if (status == 401 && code == 'UNAUTHORIZED') navigate('/sign-in')
      }
      //return the promise error
      return Promise.reject(error)
    },
  )
}
