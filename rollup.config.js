import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import includePaths from 'rollup-plugin-includepaths'
import replace from '@rollup/plugin-replace'
import packageJson from './package.json'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      // Enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('bundle.css')
      }
    }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),
    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),
    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    // Absolute imports from `src` folder
    includePaths({ paths: ['src'], extensions: ['.js', '.svelte'] }),
    replace({
      __production__: production,
      __baseUrl__: 'social-distancing',
      __version__: String(packageJson.version),
      __firebaseConfig__: process.env.FIREBASE_CONFIG || JSON.stringify(require('./databaseConfig.json'))
    })
  ],
  watch: {
    clearScreen: false
  }
}

function serve() {
  let started = false

  return {
    writeBundle() {
      if (!started) {
        started = true

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        })
      }
    }
  }
}
