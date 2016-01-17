import { firstOfType, lastOfType, nthOfType, onlyOfType, nthLastOfType } from '../../modules/mixins/childTypeIndex'
import { expect } from 'chai'

describe('Evaluating first of type', () => {
  it('should return true', () => {
    const element = { type: 'span' }
    const parent = {
      props: {
        children: [ {
          type: 'div'
        }, {
          type: 'div'
        }, element, {
          type: 'span'
        } ]
      }
    }
    expect(firstOfType('', true, '', { parent, element })).to.eql(true)

    const ownerParent = {
      props: {
        children: [ {
          type: 'div'
        }, {
          type: 'div'
        }, {
          type: 'span',
          key: 'test'
        }, {
          type: 'span'
        } ]
      }
    }
    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'span',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: ownerParent
          }
        }
      }
    }
    expect(firstOfType('', true, '', {
      element: elementWithParent
    })).to.eql(true)
  })

  it('should return false', () => {
    const element = { type: 'span' }
    const parent = {
      props: {
        children: [ {
          type: 'div'
        }, {
          type: 'span'
        }, element, {
          type: 'span'
        } ]
      }
    }
    expect(firstOfType('', true, '', { parent, element })).to.eql(false)

    expect(firstOfType('', true, '', {
      element: {
        _owner: {
          _currentElement: {  }
        }
      }
    })).to.eql(false)

    const ownerParent = {
      props: {
        children: [ {
          type: 'div'
        }, {
          type: 'div'
        }, {
          type: 'div',
          key: 'test'
        }, {
          type: 'span'
        } ]
      }
    }
    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'div',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: ownerParent
          }
        }
      }
    }
    expect(firstOfType('', true, '', {
      element: elementWithParent
    })).to.eql(false)
  })
})

describe('Evaluating last of type', () => {
  it('should return true', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [ {
          type: 'div'
        }, {
          type: 'div'
        }, element, {
          type: 'span'
        } ]
      }
    }
    expect(lastOfType('', true, '', { parent, element })).to.eql(true)

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
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }
    expect(lastOfType('', true, '', { element: elementWithParent })).to.eql(true)
  })

  it('should return false', () => {
    const element = { type: 'span' }
    const parent = {
      props: {
        children: [ {
          type: 'div'
        }, {
          type: 'span'
        }, element, {
          type: 'span'
        } ]
      }
    }
    expect(lastOfType('', true, '', { parent, element })).to.eql(false)

    expect(lastOfType('', true, '', {
      element: {
        _owner: {
          _currentElement: {  }
        }
      }
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
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }
    expect(lastOfType('', true, '', { element: elementWithParent })).to.eql(true)
  })
})

describe('Evaluating nth of type', () => {
  it('should return true', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [ {
          type: 'div'
        }, {
          type: 'div'
        }, element, {
          type: 'span'
        } ]
      }
    }
    expect(nthOfType(':nth-of-type(n+3)', true, ':nth-of-type(n+3)', {
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
                  type: 'div'
                }, {
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }

    expect(nthOfType(':nth-of-type(n+3)', true, ':nth-of-type(n+3)', {
      element: elementWithParent
    })).to.eql(true)
  })

  it('should return false', () => {
    const element = { type: 'span' }
    const parent = {
      props: {
        children: [ {
          type: 'div'
        }, {
          type: 'span'
        }, element, {
          type: 'span'
        } ]
      }
    }
    expect(nthOfType(':nth-of-type(3n-2)', true, ':nth-of-type(3n-2)', {
      parent,
      element
    })).to.eql(false)

    expect(nthOfType('', true, '', {
      element: {
        _owner: {
          _currentElement: {  }
        }
      }
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
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }

    expect(nthOfType(':nth-of-type(3n-2)', true, ':nth-of-type(3n-2)', {
      element: elementWithParent
    })).to.eql(false)
  })
})


describe('Evaluating only of type', () => {
  it('should return true', () => {
    const element = { type: 'input' }
    const parent = {
      props: {
        children: [ {
          type: 'div'
        }, {
          type: 'div'
        }, element, {
          type: 'span'
        } ]
      }
    }
    expect(onlyOfType('', true, '', { element, parent })).to.eql(true)

    const elementWithParent = {
      _owner: {
        _currentElement: {
          type: 'input',
          key: 'test'
        },
        _instance: {
          props: {
            _parent: {
              props: {
                children: [ {
                  type: 'div'
                }, {
                  type: 'input',
                  key: 'test'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }
    expect(onlyOfType('', true, '', { element: elementWithParent })).to.eql(true)
  })

  it('should return false', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [ {
          type: 'div'
        }, {
          type: 'div'
        }, element, {
          type: 'span'
        } ]
      }
    }
    expect(onlyOfType('', true, '', { element, parent })).to.eql(false)

    expect(onlyOfType('', true, '', {
      element: {
        _owner: {
          _currentElement: {  }
        }
      }
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
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }
    expect(onlyOfType('', true, '', { element: elementWithParent })).to.eql(false)
  })
})

describe('Evaluating nth-last of type', () => {
  it('should return true', () => {
    const element = { type: 'div' }
    const parent = {
      props: {
        children: [ element, {
          type: 'div'
        }, {
          type: 'div'
        }, {
          type: 'span'
        } ]
      }
    }
    expect(nthLastOfType(':nth-last-of-type(n+3)', true, ':nth-last-of-type(n+3)', {
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
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }

    expect(nthLastOfType(':nth-last-of-type(3n-2)', true, ':nth-last-of-type(3n-2)', {
      element: elementWithParent
    })).to.eql(true)
  })

  it('should return false', () => {
    const element = { type: 'span' }
    const parent = {
      props: {
        children: [ {
          type: 'div'
        }, {
          type: 'span'
        }, element, {
          type: 'span'
        } ]
      }
    }
    expect(nthLastOfType(':nth-last-of-type(3n-2)', true, ':nth-last-of-type(3n-2)', {
      parent,
      element
    })).to.eql(false)

    expect(nthLastOfType('', true, '', {
      element: {
        _owner: {
          _currentElement: {  }
        }
      }
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
                  type: 'div'
                }, {
                  type: 'div',
                  key: 'test'
                }, {
                  type: 'span'
                } ]
              }
            }
          }
        }
      }
    }

    expect(nthLastOfType(':nth-last-of-type(n+3)', true, ':nth-last-of-type(n+3)', {
      element: elementWithParent
    })).to.eql(false)
  })
})
