const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('./token');

const BASE_URL = 'https://smrtbot.herokuapp.com';

const token = getToken();

const queryQuestions = [
  {
    type: 'input',
    name: 'input',
    message: 'Enter a phrase you would like us to make SMRTer'
  },
  {
    type: 'list',
    name: 'filter',
    message: 'Select a method you would like me to use to transform: ',
    choices: ['smart', 'short', 'antonym', 'funny', 'sound']
  }
];

module.exports = () => inquirer.prompt(queryQuestions).then(async({ input, filter }) => {
  const res = await request
    .post(`${BASE_URL}/queries`)
    .send({ input, filter })
    .set('Authorization', token);
  console.log(res.body.input);
  console.log('<p>_-_-_- turned into -_-_-_-_<p>');
  console.log(res.body.output);
    
});
