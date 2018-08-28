/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  global: {
    marketUrl: 'market://details?id=com.seblacity.airtraffic.birgen',
  },
  api: {
    url: 'http://localhost:8181/api/',
  },
  firebase: {
    apiKey: 'AIzaSyDiIz_ezAJYOqau3j5o3qROmL6UnYFM_1o',
    authDomain: 'birgen-virtual-airlines-dev.firebaseapp.com',
    databaseURL: 'https://birgen-virtual-airlines-dev.firebaseio.com',
    projectId: 'birgen-virtual-airlines-dev',
    storageBucket: 'birgen-virtual-airlines-dev.appspot.com',
    messagingSenderId: '758896315897',
  },
};
