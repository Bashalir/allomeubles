module.exports = {
  presets: [
    ['next/babel', {
      'preset-env': {
        useBuiltIns: 'usage',
        corejs: '3.30.2',
        targets: {
          browsers: ['>0.3%', 'not ie 11', 'not dead', 'not op_mini all']
        }
      }
    }]
  ],
  plugins: [
    ['styled-components', { 
      ssr: true,
      displayName: true 
    }],
    ['@babel/plugin-transform-runtime', {
      corejs: 3,
      helpers: true,
      regenerator: true
    }]
  ]
}
