import {defineConfig} from "cypress";
import {plugin as cypressFirebasePlugin} from 'cypress-firebase'
// @ts-ignore
import admin from 'firebase-admin';

const cypressConfig = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin);
      // e2e testing node events setup code
    },
  }
});

export default cypressConfig;
