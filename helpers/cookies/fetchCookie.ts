'use server'
import { cookies } from '@/node_modules/next/headers';
import { Token } from '../interface/interfaces';


const fetchCookie = async (): Promise<Token | null> => {
  const cookieStore = cookies()
  const token: Token = cookieStore.get('token')
  if (!token) {
    return null
  }
  return token
}

export { fetchCookie }
