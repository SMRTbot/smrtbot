const request = require('superagent');
const inquirer = require('inquirer');

const BASE_URL = 'https://smrtbot.herokuapp.com';

// const token = null;

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
      return request
        .post(`${BASE_URL}/api/auth/signup`)
        .send({ email, password });
    });
};

const signInPrompt = () => {
  inquirer.prompt(authQuestion)
    .then(({ email, password }) => {
      if(!email || password) {
        return require('./client')();
      }
      return request
        .post(`${BASE_URL}/api/auth/signin`)
        .send({ email, password });
    });
};

module.exports = {
  signUpPrompt,
  signInPrompt
};