const inquirer = require('inquirer');
const { filter } = require('./post-query');
// const request = require('superagent');


const menuQuestions = [
  {
    type: 'list',
    message: 'Where to?',
    name: 'navMenu',
    choices: ['New Query', 'Favorites', 'About Us']
  }
];

const mainMenu = () => inquirer.prompt(menuQuestions).then((answers) => {
  switch(answers.navMenu) {
    case 'New Query':
      return filter().then(mainMenu); // Link to Post Query route
    case 'Favorites':
      return require(); //Favorites route
    case 'About Us':
      return require(); //About Us Route
  }
});

module.exports = mainMenu;