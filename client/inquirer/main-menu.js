const inquirer = require('inquirer');
const request = require('superagent');


module.exports = async(user) => {
  const menuQuestions = [
    {
      type: 'rawList',
      message: 'Where to?',
      name: 'navMenu',
      choices: ['New Query', 'Favorites', 'About Us']
    }
  ];

  return inquirer.prompt(menuQuestions)
    .then(({}))
};