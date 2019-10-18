const request = require('superagent');
const inquirer = require('inquirer');
const { getToken, getUser } = require('./token');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
const chalk = require('chalk');
const id = getUser;

const favoritesList = () => {
  return request
    .get(`${BASE_URL}/api/me/favorites/${id}`)
    .set('Authorization', getToken())
    .then(res => {
      res.body.forEach(element => {
        console.log(`${chalk.blue('Input:')} ${chalk.red(element.input)}`);
        console.log(`${chalk.blue('Output:')} ${chalk.green(element.output)}`);
        console.log(`\n`);
      });
      return res.body;
    })
    .then(favorites => {
      return Promise.all([
        inquirer.prompt([{
          type: 'list',
          name: 'choice',
          choices: ['main menu', 'delete favorite']
        }]),
        favorites
      ]);
    })
    .then(([answers, favorites]) => {
      if(answers.choice === 'delete favorite') {
        return inquirer.prompt([{
          type: 'list',
          name: 'deleteId',
          choices: favorites.map(favorite => ({
            name: `${chalk.blue(favorite.output)} \n`,
            value: favorite._id
          }))
        }])
          .then(({ deleteId }) => {
            return request
              .delete(`${BASE_URL}/api/me/favorites/${deleteId}`)
              .set('Authorization', getToken())
              .then(() => {
                console.log(chalk.yellow('Deleted!'));
              });
          });
      }
    });
};

module.exports = favoritesList;