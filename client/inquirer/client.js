const inquirer = require('inquirer');
const { signUpPrompt, signInPrompt } = require('./start');
const chalk = require('chalk');

const smrtBot =
  `                                                                                            bbbbbbbb
  SSSSSSSSSSSSSSS MMMMMMMM               MMMMMMMMRRRRRRRRRRRRRRRRR   TTTTTTTTTTTTTTTTTTTTTTTb::::::b                                      tttt
SS:::::::::::::::SM:::::::M             M:::::::MR::::::::::::::::R  T:::::::::::::::::::::Tb::::::b                                   ttt:::t
S:::::SSSSSS::::::SM::::::::M           M::::::::MR::::::RRRRRR:::::R T:::::::::::::::::::::Tb::::::b                                   t:::::t
S:::::S     SSSSSSSM:::::::::M         M:::::::::MRR:::::R     R:::::RT:::::TT:::::::TT:::::T b:::::b                                   t:::::t
S:::::S            M::::::::::M       M::::::::::M  R::::R     R:::::RTTTTTT  T:::::T  TTTTTT b:::::bbbbbbbbb       ooooooooooo   ttttttt:::::ttttttt
S:::::S            M:::::::::::M     M:::::::::::M  R::::R     R:::::R        T:::::T         b::::::::::::::bb   oo:::::::::::oo t:::::::::::::::::t
S::::SSSS         M:::::::M::::M   M::::M:::::::M  R::::RRRRRR:::::R         T:::::T         b::::::::::::::::b o:::::::::::::::ot:::::::::::::::::t
 SS::::::SSSSS    M::::::M M::::M M::::M M::::::M  R:::::::::::::RR          T:::::T         b:::::bbbbb:::::::bo:::::ooooo:::::otttttt:::::::tttttt
   SSS::::::::SS  M::::::M  M::::M::::M  M::::::M  R::::RRRRRR:::::R         T:::::T         b:::::b    b::::::bo::::o     o::::o      t:::::t
      SSSSSS::::S M::::::M   M:::::::M   M::::::M  R::::R     R:::::R        T:::::T         b:::::b     b:::::bo::::o     o::::o      t:::::t
           S:::::SM::::::M    M:::::M    M::::::M  R::::R     R:::::R        T:::::T         b:::::b     b:::::bo::::o     o::::o      t:::::t
           S:::::SM::::::M     MMMMM     M::::::M  R::::R     R:::::R        T:::::T         b:::::b     b:::::bo::::o     o::::o      t:::::t    tttttt
SSSSSSS     S:::::SM::::::M               M::::::MRR:::::R     R:::::R      TT:::::::TT       b:::::bbbbbb::::::bo:::::ooooo:::::o      t::::::tttt:::::t
S::::::SSSSSS:::::SM::::::M               M::::::MR::::::R     R:::::R      T:::::::::T       b::::::::::::::::b o:::::::::::::::o      tt::::::::::::::t
S:::::::::::::::SS M::::::M               M::::::MR::::::R     R:::::R      T:::::::::T       b:::::::::::::::b   oo:::::::::::oo         tt:::::::::::tt
SSSSSSSSSSSSSSS   MMMMMMMM               MMMMMMMMRRRRRRRR     RRRRRRR      TTTTTTTTTTT       bbbbbbbbbbbbbbbb      ooooooooooo             ttttttttttt
`
  ;
const startQuestion = [
  {
    type: 'list',
    name: 'start',
    message: chalk.green(smrtBot),
    choices: ['Sign In', 'Sign Up']
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

