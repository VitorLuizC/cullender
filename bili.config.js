const { version } = require('./package')

const banner = `/*!
 * Cullender v${version}
 * © 2017-present Vitor Cavalcanti <vitorluizc@outlook.com> (https://vitorluizc.github.io)
 * Released under the MIT License.
 */
`

module.exports = {
  banner,
  input: 'src/index.js',
  format: [ 'umd', 'umd-min', 'cjs', 'es' ]
}
