const inquirer = require('inquirer');
const chalk = require('chalk');
const menuPrompt = require('./main-menu');

const kam = `
888    d8P                         
888   d8P                          
888  d8P                           
888d88K      8888b.  88888b.d88b.  
8888888b        "88b 888 "888 "88b 
888  Y88b   .d888888 888  888  888 
888   Y88b  888  888 888  888  888 
888    Y88b "Y888888 888  888  888`
  + `\n\n\n` + `My name is Kam and i unequal to party i am unjust a guy that likes to tautness smash bros as disadvantageously as hang in with some warm peeps. My song at the inconsequence is Midnight cancelled the idle by Boombox (Random Antonym)` + `\n\n\n`;
const ollie =
  `
 .d88888b.  888 888 d8b          
d88P" "Y88b 888 888 Y8P          
888     888 888 888              
888     888 888 888 888  .d88b.  
888     888 888 888 888 d8P  Y8b 
888     888 888 888 888 88888888 
Y88b. .d88P 888 888 888 Y8b.     
 "Y88888P"  888 888 888  "Y8888`
  + `\n\n\n` + `arley bui bhalla fanna fanning ffe feely maa myh mo moglie aln` + `\n\n\n`;
const john =
  `
   888888         888               
    "88b          888               
     888          888               
     888  .d88b.  88888b.  88888b.  
     888 d88""88b 888 "88b 888 "88b 
     888 888  888 888  888 888  888 
     88P Y88..88P 888  888 888  888 
     888  "Y88P"  888  888 888  888 
   .d88P                            
 .d88P"                             
888P"`
  + `\n\n\n` + `gospel according to john is a software system railroad engineer and enjoys the good fellowship of his canis familiaris` + `\n\n\n`;
const phil =
  `
8888888b.  888      d8b 888 
888   Y88b 888      Y8P 888 
888    888 888          888 
888   d88P 88888b.  888 888 
8888888P"  888 "88b 888 888 
888        888  888 888 888 
888        888  888 888 888 
888        888  888 888 888`
  + `\n` + `
Phil likes dustup. King-size picture quarrel are major than plainly yellow informal ones. Forthwith he has a peter he rear usage to genuinely move anyone he tin can draw take heed to him. (Random Synonym)
`;
const toMenuQuestion = [
  {
    type: 'confirm',
    name: 'about',
    message: chalk.red(kam) + chalk.blue(ollie) + chalk.green(john) + chalk.yellow(phil) + `\n\n\n` + `Back to Main Menu?`
  }
];
const about = () => inquirer.prompt(toMenuQuestion).then(response => {
  switch(response.start) {
    case 'Main Menu':
      menuPrompt();
      break;
  }
});
module.exports = about;