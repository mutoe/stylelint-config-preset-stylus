const assert = require('assert')
const fs = require('fs')
const path = require('path')
const stylelint = require('stylelint')

function testConfigFile () {
  assert.doesNotThrow(() => {
    require(path.join(__dirname, '..', 'index.js'))
  })
}

function testOrder () {
  const fixture = fs.readFileSync(path.join(__dirname, 'fixture.css'), 'utf8')
  const expected = fs.readFileSync(path.join(__dirname, 'expected.css'), 'utf8')

  return stylelint.lint({
    code: fixture,
    config: require('..'),
    fix: true
  }).then(result => {
    assert.strictEqual(result.errored, false)
    assert.strictEqual(result.output, expected)
  })
}

testConfigFile()
testOrder().catch((e) => {
  if (process.env.DEBUG) {
    console.error(e.message)
  } else {
    console.error(e.name)
    console.error('Run with the DEBUG environement variable to see more.')
  }
  process.exit(-1)
})
