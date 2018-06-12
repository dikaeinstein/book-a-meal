import { getUser } from './persistUser';

const setAuthorization = () => {
  const { token } = getUser();
  return {
    Authorization: `Bearer ${token}`,
  };
};

export default setAuthorization;
