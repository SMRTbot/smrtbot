//This holds our Token for Inquirer.

let token = null;

const getToken = () => token;

const setToken = () => newToken => {
  token = newToken;
};

module.exports = {
  setToken,
  getToken
};
