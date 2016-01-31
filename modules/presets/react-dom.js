import nativePreset from './react-native'

// Plugins
import prefixer from '../plugins/prefixer'

// CSS extraction
import extractCSS from '../mixins/extractCSS'
import platformQuery from '../mixins/platformQuery'

export default {
  plugins: [
    ...nativePreset.plugins,
    prefixer
  ],
  mixins: {
    ...nativePreset.mixins,
    // CSS extraction
    css: extractCSS,

    // Queries
    '@platform': platformQuery
  }
}
