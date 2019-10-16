const request = require('superagent');
const inquirer = require('inquirer');

const BASE_URL = 'https://smrtbot.herokuapp.com';

const data = {
  email: null,
  password: null
};

const token = null;

const authQuestion = [
  {
    type: 'input',
    name: 'email',
    message: 'Enter Email: '
  },
  {
    type: 'password',
    name: 'password',
    message: 'Enter Password: '
  }
];

const signUpPrompt = () => {
  inquirer.prompt(authQuestion)
    .then(({ email, password }) => {
      if(!email || !password) {
        return require('./client')();
      }
    });
  return request
    .post(`${BASE_URL}/api/auth/signup`)
    .send(data)
    .then(({ body }) => body)
    .then(user => {
      user.token = token;
    });

};

module.exports = {
  signUpPrompt
};