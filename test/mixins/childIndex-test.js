import { firstChild, lastChild, nthChild, onlyChild, nthLastChild } from '../../modules/mixins/childIndex'
import { expect } from 'chai'

describe('Evaluating first child', () => {
  it('should return true', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [
          element, 2, 3, 4
        ]
      }
    }
    expect(firstChild('', true, '', { parent, element })).to.eql(true)

    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'div',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: {
              props: {
                children: [ {
                  type: 'div',
                  key: 'test'
                }, {
                  type: 'div'
                }, {
                  type: 'div'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }

    expect(firstChild('', true, '', { element: elementWithParent })).to.eql(true)
  })

  it('should return false', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [
          1, element, 2, 3, 4
        ]
      }
    }
    expect(firstChild('', true, '', { parent, element })).to.eql(false)

    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'div',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: {
              props: {
                children: [ {
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                }, {
                  type: 'div'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }

    expect(firstChild('', true, '', { element: elementWithParent })).to.eql(false)
  })
})


describe('Evaluating last child', () => {
  it('should return true', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [
          2, 3, 4, element
        ]
      }
    }
    expect(lastChild('', true, '', { parent, element })).to.eql(true)

    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'div',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: {
              props: {
                children: [ {
                  type: 'span'
                }, {
                  type: 'div'
                }, {
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                } ]
              }
            }
          }
        }
      }
    }

    expect(lastChild('', true, '', { element: elementWithParent })).to.eql(true)
  })

  it('should return false', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [
          1, element, 2, 3, 4
        ]
      }
    }
    expect(lastChild('', true, '', { parent, element })).to.eql(false)

    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'div',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: {
              props: {
                children: [ {
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                }, {
                  type: 'div'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }

    expect(lastChild('', true, '', { element: elementWithParent })).to.eql(false)
  })
})

describe('Evaluating only child', () => {
  it('should return true', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [
          element
        ]
      }
    }
    expect(onlyChild('', true, '', { parent, element })).to.eql(true)

    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'div',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: {
              props: {
                children: [ {
                  type: 'div',
                  key: 'test'
                } ]
              }
            }
          }
        }
      }
    }

    expect(onlyChild('', true, '', { element: elementWithParent })).to.eql(true)
  })

  it('should return false', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [
          1, element, 2, 3, 4
        ]
      }
    }
    expect(onlyChild('', true, '', { parent, element })).to.eql(false)

    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'div',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: {
              props: {
                children: [ {
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                }, {
                  type: 'div'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }

    expect(onlyChild('', true, '', { element: elementWithParent })).to.eql(false)
  })
})


describe('Evaluating nth child', () => {
  it('should return true', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [
          1, element, 3, 4
        ]
      }
    }
    expect(nthChild(':nth-child(3n-1)', true, ':nth-child', {
      parent,
      element
    })).to.eql(true)

    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'div',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: {
              props: {
                children: [ {
                  type: 'span'
                }, {
                  type: 'span'
                }, {
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                } ]
              }
            }
          }
        }
      }
    }

    expect(nthChild(':nth-child(3n-2)', true, ':nth-child', {
      element: elementWithParent
    })).to.eql(true)
  })

  it('should return false', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [
          1, element, 2, 3, 4
        ]
      }
    }
    expect(nthChild(':nth-child(3n-2)', true, ':nth-child', {
      parent,
      element
    })).to.eql(false)

    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'div',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: {
              props: {
                children: [ {
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                }, {
                  type: 'div'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }

    expect(nthChild(':nth-child(3n)', true, ':nth-child', {
      element: elementWithParent
    })).to.eql(false)
  })
})

describe('Evaluating nth-last child', () => {
  it('should return true', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [
          1, 2, element, 3
        ]
      }
    }
    expect(nthLastChild(':nth-last-child(3n-1)', true, ':nth-last-child', {
      parent,
      element
    })).to.eql(true)

    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'div',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: {
              props: {
                children: [ {
                  type: 'span'
                }, {
                  type: 'span'
                }, {
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                } ]
              }
            }
          }
        }
      }
    }

    expect(nthLastChild(':nth-child(3n-2)', true, ':nth-child', {
      element: elementWithParent
    })).to.eql(true)
  })

  it('should return false', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [
          1, element, 2, 3, 4
        ]
      }
    }
    expect(nthLastChild(':nth-child(3n-1)', true, ':nth-child', {
      parent,
      element
    })).to.eql(false)

    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'div',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: {
              props: {
                children: [ {
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                }, {
                  type: 'div'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }

    expect(nthLastChild(':nth-child(3n-1)', true, ':nth-child', {
      element: elementWithParent
    })).to.eql(false)

    expect(nthLastChild(':nth-child(3n-1)', true, ':nth-child', {
      element: {
        _owner: {
          _instance: {
            props: {}
          }
        }
      }
    })).to.eql(false)
  })
})
