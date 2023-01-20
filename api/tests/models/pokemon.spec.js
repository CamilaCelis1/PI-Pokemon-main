const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
      it('should throw an error if ID is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid ID')))
          .catch(() => done());
      });
      it('should work when its a valid ID', () => {
        Pokemon.create({ ID: 1 });
      });
    });
  });
});
