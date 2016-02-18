import getChildType from '../../utils/getChildType'

const classNameTemplate = (Component, element, className) => {
  return Component.constructor.displayName + '-' + getChildType(element) + '--' + className
}

const classMapping = new Map()

export default function friendlyClassNames({ StyleContainer, Component, element, newProps, styles }) {
  // Only transform if not already transformed and a className exists
  if (!newProps._hasFriendlyClassNames && newProps.className) {
    newProps.className = newProps.className.split(' ').reduce((className, cls) => {
      cls = cls.trim()
      if (cls === '') {
        return className
      }
      // If the className has already been resolved
      // just use the former new className
      if (classMapping.has(cls)) {
        className += className + className !== '' ? ' ' : '' + classMapping.get(cls)
      } else {
        const newClass = classNameTemplate(Component, element, cls)
        let isLookClass = false

        // immutable selectors to iterate without changes
        const selectors = [ ...StyleContainer.selectors ]
        const mediaQueries = [ ...StyleContainer.mediaQueries ]

        // Replace basic selector classNames
        selectors.forEach(([ selector, styles ]) => {
          // only if the selectors starts with the className
          if (selector.indexOf('.' + cls) === 0) {
            const pseudo = selector.replace(new RegExp('.' + cls, 'g'), '')
            // Cache resolved classNames for later use
            classMapping.set(cls, newClass)
            // Push the new className and remove the old one
            StyleContainer.add('.' + newClass + pseudo, styles)
            StyleContainer.selectors.delete(selector)
            isLookClass = true
          }
        })

        // Iterate media queries and replace selectors
        mediaQueries.forEach(([ media, selectors ]) => {
          const mediaSelectors = [ ...selectors ]
          mediaSelectors.forEach(([ selector, styles ]) => {
            if (selector.indexOf('.' + cls) === 0) {
              isLookClass = true
              const pseudo = selector.replace(new RegExp('.' + cls, 'g'), '')
              classMapping.set(cls, newClass)
              // Also overwrite media query selectors
              StyleContainer.add('.' + newClass + pseudo, styles, media)
              StyleContainer.mediaQueries.get(media).delete('.' + cls + pseudo)
            }
          })
        })

        // Concats the new className or uses the old className
        // if it is not provided by Look
        className += (className !== '' ? ' ' : '') + (isLookClass ? newClass : cls)
      }
      return className; // eslint-disable-line
    }, '')
  }

  // Forces Look to clone the element
  newProps._lookShouldUpdate = true
  // Sets a flag to be able to skip resolving next time
  newProps._hasFriendlyClassNames = true

  return styles
}
