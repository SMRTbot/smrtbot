# SMRT Bot

## Authors
John, Kam, Phil, Ollie

### Links and Resources
* [submission PR](https://github.com/SMRTbot/smrtbot/pull/19)
* [Travis](https://travis-ci.org/SMRTbot)
* [Heroku](https://smrtbot.herokuapp.com)
* [front-end](http://xyz.com) (when applicable)

#### Documentation
* [Datamuse api docs](http://www.datamuse.com/api/)

### Setup
#### `.env` requirements
* `PORT` 3000
* [MONGODB_URI](mongodb://heroku_x8t5gc5s:kj8u60bhkjr2r6v4mme5la18i7@ds149335.mlab.com:49335/heroku_x8t5gc5s)

### Running the app
//open inquirer and follow prompts

**Filter Options:**

 * antonym - random antonyms
 * funny - random synonyms
 * gracioso - spanish-to-spanish
 * homophone - sound-alikes
 * rhyme - rhyming words
 * short - shortest synonym
 * smart - longest synonym
 * sound - words with similar sounds
 * spelling - words with similar letters
 * vowels - words with different vowels, same consonant sounds


**Scripts**

  * pretest: npm run lint
  * test: npm run jest
  * start: node server.js
  * lint: eslint .
  * jest: jest --runInBand
  * test: coverage: npm run test -- --coverage
  * test:watch: npm run jest -- --watchAll
  * test:verbose: npm run test -- --verbose
  * start:watch: nodemon server.js

#### UML

![Front-end](./assets/front-end.jpg)
![Back-end](./assets/back-end.png)