var webpack = require('webpack')
var path = require('path')

var conf = {
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    alias: {
      'react-look-core': path.join(__dirname, 'packages/react-look-core/modules/index.js')
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'packages/react-look-core'),
          path.join(__dirname, 'packages/react-look')
        ],
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    // Expect react to be imported beforehand. On the browser it's imported as 'React'.
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'inline-style-linter': {
      commonjs2: 'inline-style-linter',
      commonjs: 'inline-style-linter',
      amd: 'inline-style-linter'
    },
    'inline-style-prefixer': {
      commonjs2: 'inline-style-prefixer',
      commonjs: 'inline-style-prefixer',
      amd: 'inline-style-prefixer'
    }
  },
  output: {
    library: 'react-look',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  conf.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = conf
