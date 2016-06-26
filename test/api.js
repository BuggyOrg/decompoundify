/* eslint-env mocha */

import chai from 'chai'
import {graph as graphAPI} from '@buggyorg/graphtools'
import removeCompounds from '../src/api'
import fs from 'fs'
import _ from 'lodash'

var expect = chai.expect

var readFixture = (file) => {
  return graphAPI.readFromFile('test/fixtures/' + file)
}

describe('Remove compounds', () => {
  it('does not change a graph without compounds', () => {
    var inout = readFixture('inout.json')
    var processed = removeCompounds(inout)
    expect(graphAPI.equal(inout, processed)).to.be.true
  })

  it('does remove custom compounds', () => {
    var simple = readFixture('simple_compound.json')
    var processed = removeCompounds(simple)
    expect(processed.nodes()).to.have.length(simple.nodes().length - 1)
  })

  it('does not remove recursive compounds', () => {
    var fac = readFixture('factorial_mux.json')
    var processed = removeCompounds(fac)
    expect(_.filter(processed.nodes(), (n) => !processed.node(n).atomic)).to.have.length(2)
  })

  it('does remove compounds inside of recursive nodes', () => {
    var fac = readFixture('factorial.json')
    var processed = removeCompounds(fac)
    fs.writeFileSync('test.json', JSON.stringify(graphAPI.toJSON(processed), null, 2))
    expect(_.filter(processed.nodes(), (n) => !processed.node(n).atomic)).to.have.length(2)
  })
})

