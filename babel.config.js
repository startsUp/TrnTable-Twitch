module.exports = {
    presets: [
      ["@babel/preset-env",
      {
        targets:{
          node:"current"
        }
      }],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    env: {
        test: {
          plugins: [
            "@babel/plugin-transform-modules-commonjs",
            "@babel/plugin-proposal-class-properties"
          ]
        }
      } 
  }