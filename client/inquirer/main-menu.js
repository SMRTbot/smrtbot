const inquirer = require('inquirer');
const request = require('superagent');


const menuQuestions = [
  {
    type: 'rawList',
    message: 'Where to?',
    name: 'navMenu',
    choices: ['New Query', 'Favorites', 'About Us']
  }
];

module.exports = () => inquirer.prompt(menuQuestions).then(({ navMenu }) => {
  switch(navMenu) {
    case 'New Query':
      return require('./post-query'); // Link to Post Query route
    case 'Favorites':
      return require(); //Favorites route
    case 'About Us':
      return require(); //About Us Route
  }
});