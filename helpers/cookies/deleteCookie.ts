'use server'
import { cookies } from '@/node_modules/next/headers';

const deleteCookie = async () => {
  cookies().delete("token")
}

export { deleteCookie }
