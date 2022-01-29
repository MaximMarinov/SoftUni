const testNumbers = require("./testNumbers");
const expect = require('chai').expect;

describe('Tests', () => {

    describe('sumNumbers', () => {
        it('returns undefinied if the input is not a number', () => {
            expect(testNumbers.sumNumbers('a', 'b')).to.be.undefined;
        });

        it('returns the sum fixed to 2', () => {
            expect(testNumbers.sumNumbers(1, 2)).to.equal('3.00');
        });

        it('returns the sum of negatives fixed to 2', () => {
            expect(testNumbers.sumNumbers(-1, 2)).to.equal('1.00');
        });
    });

    describe('numberChecker', () => {
        it('throws error if the input is not a number', () => {
            expect(() => testNumbers.numberChecker('a')).to.throw('The input is not a number!');
        });

        it('returns a message when the number is even', () => {
            expect(testNumbers.numberChecker(2)).to.equal('The number is even!');
        });

        it('returns a message when the number is odd', () => {
            expect(testNumbers.numberChecker(1)).to.equal('The number is odd!');
        });
    });

    describe('averageSumArray', () => {
        it('returns the average sum', () => {
            expect(testNumbers.averageSumArray([2, 2])).to.equal(2);
        });
    });
});