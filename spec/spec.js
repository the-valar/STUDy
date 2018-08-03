const assert = require('assert')
const expect = require('chai').expect
const React = require('react')
const { mount } = require('enzyme')
// const { spy } = require('sinon')

describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal([1,2,3].indexOf(4), -1);
      });
    });
  });


/////////Parker Test











////Kiernen Test









/////Martin Test
// const FlashcardMain = require('./../client/components/FlashcardMain.jsx')
const db = require('./../server/db/models/_model')

// spy(FlashcardMain.prototype, 'componentDidMount')

describe('database', () => {
  describe('fetch Deck names', () => {
    it('should receive an array of names from the db', () => {
        db.fetchDeckNames(1, (err, docs) => { 
          expect(docs[0]).to.have.property('title')
        })
    })
  })
})