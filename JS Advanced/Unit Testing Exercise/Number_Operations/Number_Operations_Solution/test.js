const { expect } = require("chai");
const numberOperations = require("./numberOperations");

describe('numberOperations', () => {

    describe('powNumber', () => {
        it('returns the power of the given number', () => {
            expect(numberOperations.powNumber(5)).to.equal(25);
            expect(numberOperations.powNumber(-5)).to.equal(25);
            expect(numberOperations.powNumber(5.5)).to.equal(30.25);
            // expect(numberOperations.powNumber(-5.5)).to.equal(30.25);
            // expect(numberOperations.powNumber('a')).to.be.NaN;
            // expect(numberOperations.powNumber({})).to.be.NaN;
            // expect(numberOperations.powNumber([])).to.equal(0);
        });
    });

    describe('numberChecker', () => {
        it('returns message when the number is lower than 100', () => {
            expect(numberOperations.numberChecker(1)).to.equal('The number is lower than 100!');
            expect(numberOperations.numberChecker(99)).to.equal('The number is lower than 100!');
        });

        it('returns message when the number is bigger than 100', () => {
            expect(numberOperations.numberChecker(101)).to.equal('The number is greater or equal to 100!');
            expect(numberOperations.numberChecker(100)).to.equal('The number is greater or equal to 100!');
        });

        it('throws an error when the input is not a number', () => {
            expect(() => numberOperations.numberChecker('a')).to.throw('The input is not a number!');
            expect(numberOperations.numberChecker.bind([])).to.throw('The input is not a number!');
            expect(() => numberOperations.numberChecker({})).to.throw('The input is not a number!');
            expect(() => numberOperations.numberChecker(undefined)).to.throw('The input is not a number!');
            expect(() => numberOperations.numberChecker(NaN)).to.throw('The input is not a number!');
        });
    });

    describe('sumArrays', () => {
        it('returns the sum of the arrays', () => {
            expect(numberOperations.sumArrays([1, 2, 3], [1, 2, 3])).to.deep.equal([2, 4, 6]);
            expect(numberOperations.sumArrays([1, 2, 3], [1, 2, 3, 4])).to.deep.equal([2, 4, 6, 4]);
            expect(numberOperations.sumArrays([1, 2, 3, 4], [1, 2, 3])).to.deep.equal([2, 4, 6, 4]);
        });
    });
});