import Cookies from 'js-cookie';

export const getToken = () => {
  const token = Cookies.get('refreshToken');
  if (!token) {
    return null;
  }

  return token;
};
