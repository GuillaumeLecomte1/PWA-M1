const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://49f3-84-55-185-138.ngrok-free.app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
