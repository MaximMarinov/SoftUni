const { expect } = require("chai");
const cinema = require("./cinema");

describe('Cinema', () => {

    describe('showMovies', () => {
        it('return a msg when the arr is empty', () => {
            expect(cinema.showMovies([])).to.equal('There are currently no movies to show.');
        });

        it('returns the arr when is full', () => {
            expect(cinema.showMovies(['King Kong', 'The Tomorrow War', 'Joker'])).to.equal('King Kong, The Tomorrow War, Joker');
            expect(cinema.showMovies([1, 2, 3])).to.equal('1, 2, 3');
        });
    });

    describe('ticketPrice', () => {
        it('return a msg when the projectionType is not in the schedule', () => {
            expect(() => cinema.ticketPrice('a')).to.throw('Invalid projection type.');
            expect(() => cinema.ticketPrice(1)).to.throw('Invalid projection type.');
            expect(() => cinema.ticketPrice(-1)).to.throw('Invalid projection type.');
            expect(() => cinema.ticketPrice('random')).to.throw('Invalid projection type.');
        });

        it('returns the price', () => {
            expect(cinema.ticketPrice('Normal')).to.equal(7.50);
            expect(cinema.ticketPrice('Premiere')).to.equal(12.00);
            expect(cinema.ticketPrice('Discount')).to.equal(5.50);
        });
    });

    describe('swapSeatsInHall', () => {
        it('return a msg when the input is invalid', () => {
            expect( cinema.swapSeatsInHall('a', 1)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(1, 1)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(1, 'a')).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall('a', 'a')).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(1.2, 1)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(1, 1.2)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(1.2, 1.2)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(1.2, 'a')).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall('a', 1.2)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(21, 1)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(1, 21)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(21, 21)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall('a', 21)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(21, 'a')).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(21, 1.2)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(1.2, 21)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(0, 1)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(1, 0)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(0, 0)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall('a', 0)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(0, 'a')).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(0, 1.2)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(1.2, 0)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(21, 0)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(0, 21)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(-1, 'a')).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(-1, -1)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall('a', -1)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(21, -1)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(-1, 21)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(-1, 0)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(0, -1)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(1.2, -1)).to.equal('Unsuccessful change of seats in the hall.');
            expect( cinema.swapSeatsInHall(-1, 1.2)).to.equal('Unsuccessful change of seats in the hall.');
            
        });

        it('returns succes', () => {
            expect(cinema.swapSeatsInHall(5, 6)).to.equal('Successful change of seats in the hall.');
            expect(cinema.swapSeatsInHall(6, 5)).to.equal('Successful change of seats in the hall.');
        });
    });
});