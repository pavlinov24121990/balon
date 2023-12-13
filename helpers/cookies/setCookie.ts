'use server'
import { cookies } from '@/node_modules/next/headers';

const setCookieToken = async (data: string) => {
  const oneDay = 24 * 60 * 60 * 1000
  cookies().set({
    name: "token",
    value: data,
    expires: new Date(Date.now() + oneDay),
    path: '/',
  });
}

export { setCookieToken }
