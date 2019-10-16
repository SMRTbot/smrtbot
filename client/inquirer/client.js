const inquirer = require('inquirer');
const { signUpPrompt, signInPrompt } = require('./api');

const startQuestion = [
  {
    type: 'list',
    name: 'start',
    message: 'SMRTbot',
    choices: ['Sign In', new inquirer.Separator(), 'Sign Up']
  }
];

const client = () => inquirer.prompt(startQuestion).then(response => {
  switch(response.start) {
    case 'Sign Up':
      signUpPrompt();
      break;
    case 'Sign In':
      signInPrompt();
      break;
  }
});

module.exports = client;