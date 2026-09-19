/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
  cache: true,
  rules: {
    'block-no-empty': true,
    'selector-class-pattern':
      '^(?:[a-z][a-z0-9]*(-[a-z0-9]+)*|[a-z][a-z0-9]*(_[a-z0-9]+)*)$',
  },
};
