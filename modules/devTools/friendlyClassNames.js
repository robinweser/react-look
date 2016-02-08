const classNameTemplate = (Component, element, className) => Component.constructor.displayName + '-' + element.type + '--' + className

const classMapping = new Map()

export default function friendlyClassNames({ StyleContainer, Component, element, newProps, styles }) {
  if (!newProps._hasFriendlyClassNames && newProps.className) {
    newProps.className = newProps.className.split(' ').reduce((className, cls) => {
      cls = cls.trim()
      if (cls === '') {
        return className
      }
      if (classMapping.has(cls)) {
        className += className + className !== '' ? ' ' : '' + classMapping.get(cls)
      } else {
        const newClass = classNameTemplate(Component, element, cls)
        let isLookClass = false
        const selectors = [ ...StyleContainer.selectors ]
        const mediaQueries = [ ...StyleContainer.mediaQueries ]

        // Replace basic selectors
        selectors.forEach(([ selector, styles ]) => {
          if (selector.indexOf(cls) === 1) {
            isLookClass = true
            const pseudo = selector.replace(new RegExp('.' + cls, 'g'), '')
            classMapping.set(cls, newClass)
            StyleContainer.add('.' + newClass + pseudo, styles)
            StyleContainer.selectors.delete(selector)
          }
        })

        // Iterate media queries and replace selectors
        mediaQueries.forEach(([ media, selectors ]) => {
          const mediaSelectors = [ ...selectors ]
          mediaSelectors.forEach(([ selector, styles ]) => {
            if (selector.indexOf(cls) === 1) {
              isLookClass = true
              const pseudo = selector.replace(new RegExp('.' + cls, 'g'), '')
              classMapping.set(cls, newClass)
              StyleContainer.add('.' + newClass + pseudo, styles, media)
              StyleContainer.mediaQueries.get(media).delete('.' + cls + pseudo)
            }
          })
        })

        className += (className !== '' ? ' ' : '') + (isLookClass ? newClass : cls)
      }
      return className; // eslint-disable-line
    }, '')
  }

  newProps._lookShouldUpdate = true
  newProps._hasFriendlyClassNames = true

  return styles
}
