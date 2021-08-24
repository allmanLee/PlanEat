module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router)']
  ,  testMatch: ['**/*.spec.[jt]s?(x)', '**/*.test.[jt]s?(x)'],
}
