import { Token, User } from "../interface/interfaces";


const fetchUser = async (token: Token | null): Promise<User | null> => {
  if (!token) {
    throw new Error('token is required')
    } 
  try {
    const response = await fetch('http://127.0.0.1:3000/api/v1/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token?.value}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export { fetchUser }