var inquirer = require("inquirer");
var wordArray = require("./wordArray.js");
var Word = require("./word");

function Game() {
    var self = this;

    this.play = function () {
        this.guessLeft = 10;
        this.nextWord();
    };

    this.nextWord = function () {
        var randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        this.currentWord = new Word(randomWord);

        console.log("\n" + this.currentWord + "\n");

        this.makeGuess();
    };

    this.makeGuess = function () {
        this.askforLetter().then(function () {
            if (self.guessLeft < 1) {
                console.log("You lost!")
                console.log("Word was: " + self.currentWord.getSolution() + "\n");
                self.askPlayAgain();
            } else if (self.currentWord.guessCorrectly()) {
                console.log("Right, next word!");
                self.guessLeft = 10;
                self.nextWord();
            } else {
                self.makeGuess();
            }
        });
    };

    this.askPlayAgain = function () {
        inquirer.prompt([{
            message: "Play again?",
            type: "confim",
            name: "choice"
        }]).then(function (val) {
            if (val.choice) {
                self.play();
            } else {
                self.quit();
            }
        });
    };

    this.askforLetter = function () {
        return inquirer.prompt([{
            message: "Guess a letter!",
            type: "input",
            name: "choice",
            validate: function (val) {
                return /[a-z1-9]/gi.test(val);
            }
        }]).then(function (val) {
            var didGuessCorrectly = self.currentWord.guessLetter(val.choice);
            if (didGuessCorrectly) {
                console.log("\nCorrect\n");
            } else {
                self.guessLeft--;
                console.log("\nIncorrect!\n");
                console.log(self.guessLeft + " remaining");
            }
        });
    };

    this.quit = function () {
        console.log("\nGoodbye!");
        process.exit(0);
    };
};

module.exports = Game;