import baseConfig from '../../prettier.config.base.mjs'

export default {
  ...baseConfig,
  tailwindStylesheet: './src/index.css',
  plugins: ['prettier-plugin-tailwindcss'],
}
