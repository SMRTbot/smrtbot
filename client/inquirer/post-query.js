const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('./token');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
const chalk = require('chalk');

const queryQuestions = [
  {
    type: 'input',
    name: 'input',
    message: 'Enter a phrase you would like us to make SMRTer: '
  },
  {
    type: 'list',
    name: 'filter',
    message: 'Select a method you would like me to use to transform: ',
    choices: ['smart', 'short', 'antonym', 'funny', 'sound', 'spelling', 'rhyme', 'homophone', 'vowels', 'gracioso']
  }
];

const confirm = [{
  type: 'confirm',
  name: 'favorites',
  message: 'Would you like to save to favorites?',
}];

const filter = () => inquirer.prompt(queryQuestions).then(response => {
  return request
    .post(`${BASE_URL}/api/queries`)
    .set('Authorization', getToken())
    .send({ input: response.input, filter: response.filter })
    .then(res => {
      console.log(chalk.red('----You Said---------------'));
      console.log(chalk.red(res.body.input));
      console.log(chalk.green('----SMRTbot Suggests-------'));
      console.log(chalk.green(res.body.output)); 
      console.log(chalk.blue('---------------------------'));
      return res.body;
    })
    .then((body) => {
      return inquirer.prompt(confirm).then(response => {
        if(response.favorites === true) {
          return request
            .put(`${BASE_URL}/api/me/favorites/${body._id}`)
            .set('Authorization', getToken())
            .send({ favorites: response.favorites })
            .then(() => {
              console.log(chalk.green('Saved!'));
            });
        }
        else {
          console.log(chalk.red('Not Saved. . .'));
        }   
      });
    });
});

module.exports = {
  filter,
}; 