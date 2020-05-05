/* global describe, it */
/* eslint-disable no-undef */

// const chai  = window.chai
const expect = chai.expect


console.log('expect =', expect)

describe('init test', () => {
  it('should return a string', done => {
    expect(init()).to.be.a('string')
    done()
  })
})