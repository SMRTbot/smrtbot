const request = require('superagent');
// const inquirer = require('inquirer');
const { getToken, getUser } = require('./token');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;

// const favoriteQuestion = [
//   {
//     type: '',
//     name: '',
//     message: ''
//   }
// ];
const id = getUser;
const favoritesList = () => {

  return request
    .get(`${BASE_URL}/api/me/favorites/${id}`)
    .set('Authorization', getToken())
    .then(res => {
      console.log(res.body);
      return res.body;
    });
};

module.exports = favoritesList;