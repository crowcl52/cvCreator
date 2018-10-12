// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDthgX76fPlMdMiA9V-xy_5pOEZx8LZv7k',
    authDomain: 'mycv-94fb2.firebaseapp.com',
    databaseURL: 'https://mycv-94fb2.firebaseio.com',
    projectId: 'mycv-94fb2',
    storageBucket: 'mycv-94fb2.appspot.com',
    messagingSenderId: '92587962954'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
