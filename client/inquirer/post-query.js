const request = require('superagent');
const inquirer = require('inquirer');
const client = require('./client');

const BASE_URL = 'https://smrtbot.herokuapp.com';

const queryQuestions = [
  {
    type: 'input',
    name: 'input',
    message: 'Enter a phrase you would like us to make SMRTer'
  },
  {
    type: 'list',
    name: 'filter',
    message: 'Select a method you would like to transform: ',
    choices: ['smart', 'short', 'antonym', 'funny', 'sound']
  }
];

module.exports = () => inquirer.prompt(queryQuestions).then(({ input, filter }) => {
  return request
    .post(`${BASE_URL}/queries`)
    .send({ input, filter })
    .set('Authorization', token)
});
