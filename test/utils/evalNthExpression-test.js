import evalNthExpression from '../../lib/utils/evalNthExpression'
import { expect } from 'chai'

describe('Evaluating :nth pseudo expressions', () => {
  it('should validate true', () => {
    expect(evalNthExpression('even', 2)).to.equal(true)
    expect(evalNthExpression('even', 4)).to.equal(true)

    expect(evalNthExpression('odd', 1)).to.equal(true)
    expect(evalNthExpression('odd', 3)).to.equal(true)

    expect(evalNthExpression('3n+2', 2)).to.equal(true)
    expect(evalNthExpression('3n+2', 5)).to.equal(true)
    expect(evalNthExpression('3n+2', 8)).to.equal(true)

    expect(evalNthExpression('-2n+3', 1)).to.equal(true)
    expect(evalNthExpression('-2n+3', 3)).to.equal(true)

    expect(evalNthExpression('n+3', 3)).to.equal(true)
    expect(evalNthExpression('n+3', 4)).to.equal(true)
    expect(evalNthExpression('n+3', 5)).to.equal(true)

    expect(evalNthExpression('3', 3)).to.equal(true)
  })


  it('should validate false', () => {
    expect(evalNthExpression('even', 1)).to.equal(false)
    expect(evalNthExpression('even', 3)).to.equal(false)

    expect(evalNthExpression('odd', 2)).to.equal(false)
    expect(evalNthExpression('odd', 4)).to.equal(false)

    expect(evalNthExpression('3n+2', 1)).to.equal(false)
    expect(evalNthExpression('3n+2', 4)).to.equal(false)
    expect(evalNthExpression('3n+2', 6)).to.equal(false)
    expect(evalNthExpression('3n+2', 7)).to.equal(false)

    expect(evalNthExpression('-2n+3', 2)).to.equal(false)
    expect(evalNthExpression('-2n+3', 4)).to.equal(false)
    expect(evalNthExpression('-2n+3', 5)).to.equal(false)

    expect(evalNthExpression('n+3', 1)).to.equal(false)
    expect(evalNthExpression('n+3', 2)).to.equal(false)

    expect(evalNthExpression('3', 1)).to.equal(false)
    expect(evalNthExpression('3', 2)).to.equal(false)
    expect(evalNthExpression('3', 4)).to.equal(false)
  })

  it('should validate false if expression or index are invalid', () => {
    expect(evalNthExpression('14')).to.equal(false)
    expect(evalNthExpression(14)).to.equal(false)
    expect(evalNthExpression(14, 3)).to.equal(false)
    expect(evalNthExpression(14, '3')).to.equal(false)
  })
})
