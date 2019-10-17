const request = require('superagent');
const inquirer = require('inquirer');
const mainMenu = require('./main-menu');
const client = require('./client');
const { setToken, setUser } = require('./token');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;

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
  return inquirer.prompt(authQuestion)
    .then(({ email, password }) => {
      return request
        .post(`${BASE_URL}/api/auth/signup`)
        .send({ email, password })
        .then(res => {
          setToken(res.body.token);
          setUser(res.body._id);
          return mainMenu(res.body);
        });
    });
};

const signInPrompt = () => {
  return inquirer.prompt(authQuestion)
    .then(({ email, password }) => {
      return request
        .post(`${BASE_URL}/api/auth/signin`)
        .send({ email, password })
        .then(res => {
          if(res.body.status === 401) {
            console.log('Unauthorized');
            return client();
          }
          setToken(res.body.token);
          setUser(res.body._id);
          return mainMenu(res.body);
        });
    });
};

module.exports = {
  signUpPrompt,
  signInPrompt
};