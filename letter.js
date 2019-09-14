module.exports = function CheckLetter(letter) {
    this.letter = letter;
    this.visible = !/[a-z1-9]/i.test(letter);
}

CheckLetter.prototype.toString = function () {
    if (this.visible) {
        return this.letter;
    }
    return "_";
};

CheckLetter.prototype.getSolution = function () {
    return this.letter;
};

CheckLetter.prototype.guess = function (characterGuess) {
    if (characterGuess.toUpperCase() === this.letter.toUpperCase()) {
        this.visible = true;
        return true;
    }
    return false;
};