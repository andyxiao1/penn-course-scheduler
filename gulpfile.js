var gulp = require('gulp');
var eslint = require('gulp-eslint');

var FILES = [
  'index.js',
  'start-client.js',
  'utils/*.js',
  'client/src/index.js',
  'client/src/components/*.js'
];

gulp.task('eslint', function() {
  return gulp
    .src(FILES)
    .pipe(
      eslint({
        env: {
          node: true,
          es6: true
        },
        rules: {
          'brace-style': [2, '1tbs'],
          'keyword-spacing': 2,
          indent: [2, 2],
          'no-alert': 2,
          'no-bitwise': 2,
          'no-console': 0,
          'no-extra-boolean-cast': 0,
          'no-loop-func': 2,
          'no-multi-spaces': 2,
          'no-underscore-dangle': 0,
          'quote-props': [2, 'as-needed'],
          quotes: [2, 'single', 'avoid-escape'],
          'space-before-blocks': 2,
          'space-before-function-paren': 2,
          'space-infix-ops': 2,
          strict: 0
        },
        extends: 'eslint:recommended'
      })
    )
    .pipe(eslint.format());
});

// "eslint-config-airbnb": "^17.1.0",
// "eslint-plugin-import": "^2.16.0",
// "eslint-plugin-jsx-a11y": "^6.2.0",
// "eslint-plugin-react": "^7.12.4",
// "jsdom": "13.2.0",
// "jsdom-global": "3.0.2",
// "webpack-cli": "^3.2.1"
