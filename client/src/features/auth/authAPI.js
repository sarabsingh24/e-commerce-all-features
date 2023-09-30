import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

/// Register user ==============================================
const registerUser = async (obj) => {
  const response = await axios.post(BASE_URL + '/users', obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  return data;
};

/// login User ==============================================
const loginUser = async (obj) => {
  const emailId = obj.email;
  const password = obj.password;

  const response = await axios.get(BASE_URL + '/users?email=' + emailId);

  const data = await response.data;
console.log(data)
  if (data[0].password === password) {
    return data[0];
  }
};

/// update User ==============================================
const updateUser = async (obj) => {
  const response = await axios.patch(BASE_URL + '/users/' + obj.id, obj, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.data;

  if (data.email) {
    delete data.id;
    return data;
  }
};

const userAPI = { registerUser, loginUser, updateUser };

export default userAPI;
