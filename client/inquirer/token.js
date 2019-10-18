//This holds our Token for Inquirer.

let token = null;

const getToken = () => token;

const setToken = newToken => {
  token = newToken;
};


//This holds our User for Inquirer.

let user = null;

const getUser = () => user;

const setUser = newUser => {
  user = newUser;
};

module.exports = {
  setToken,
  getToken,
  getUser,
  setUser
};
