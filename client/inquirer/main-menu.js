const inquirer = require('inquirer');
const postQuery = require('./post-query');
// const request = require('superagent');


const menuQuestions = [
  {
    type: 'list',
    message: 'Where to?',
    name: 'navMenu',
    choices: ['New Query', 'Favorites', 'About Us']
  }
];

module.exports = () => inquirer.prompt(menuQuestions).then(({ answers }) => {
  switch(answers) {
    case 'New Query':
      return postQuery(answers); // Link to Post Query route
    case 'Favorites':
      return require(); //Favorites route
    case 'About Us':
      return require(); //About Us Route
  }
});