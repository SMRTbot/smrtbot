const inquirer = require('inquirer');
const { signUpPrompt } = require('./api');


const startQuestion = [
  {
    type: 'list',
    name: 'start',
    message: 'SMRTbot',
    choices: ['Sign In', 'Sign Up']
  }
];

const client = () => inquirer.prompt(startQuestion).then(response => {
  switch(response.start) {
    case 'Sign Up':
      signUpPrompt();
      break;
  }
});

module.exports = client;