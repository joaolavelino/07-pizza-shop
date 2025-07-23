import { z } from 'zod'

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  VITE_API_URL: z.string(), //remove the URL because of the tests
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
  //if value is equals true, it will return true
})

export const env = envSchema.parse(import.meta.env)
