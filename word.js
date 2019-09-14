var CheckLetter = require("./letter.js");

function Word(word) {
    this.CheckLetter = word.split("").map(function (char) {
        return new CheckLetter(char);
    });
};

Word.prototype.getSolution = function () {
    return this.CheckLetter.map(function (letter) {
        return letter.getSolution();
    }).join("");
};

Word.prototype.toString = function () {
    return this.letter.join(" ");
};

Word.prototype.guessLetter = function (char) {
    var foundLetter = false;
    this.letter.forEach(letter => {
        if (letter.guess(char)) {
            foundLetter = true;
        }
    });
    console.log("\n" + this + "\n");
    return foundLetter;
}

Word.prototype.guessCorrectly = function () {
    return this.letter.every(function (letter) {
        return letter.visible;
    })
};

module.exports = Word;