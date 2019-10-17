# SMRT Bot

## Authors
John, Kam, Phil, Ollie

### Links and Resources
* [submission PR](http://xyz.com)

* [Travis](https://travis-ci.org/SMRTbot)
* [Heroku back-end](https://smrtbot.herokuapp.com)

* [front-end](http://xyz.com) (when applicable)

#### Documentation
* [Datamuse api docs](http://www.datamuse.com/api/)

### Setup
#### `.env` requirements
* `PORT` 3000
* [MONGODB_URI](mongodb://heroku_x8t5gc5s:kj8u60bhkjr2r6v4mme5la18i7@ds149335.mlab.com:49335/heroku_x8t5gc5s)

#### Running the app
Open terminal, run inquirer, and follow prompts

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
  
#### Tests
Any additional testing information

#### UML
Link to an image of the UML for your application and response to events