import { api } from '@/lib/axios'
import { isAxiosError } from 'axios'
import type { NavigateFunction } from 'react-router-dom'
import { toast } from 'sonner'

export const authenticatorInterceptor = (navigate: NavigateFunction) => {
  return api.interceptors.response.use(
    (response) => response,
    (error) => {
      //isAxiosError will get the correct error typing
      if (isAxiosError(error)) {
        //Get the information
        const status = error.response?.status
        //condition to the automatic redirection
        if (status == 401) {
          toast.error('Authorization error', {
            description: 'You are going to be redirected to the sing-in page',
          })
        }

        if (error.response) {
          toast.error('Network error', {
            description: 'Try again later',
          })
        }
        navigate('/sign-in')
      }
      //return the promise error
      return Promise.reject(error)
    },
  )
}
