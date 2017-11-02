// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyDCAWgvZsxRGabBiHXRTy2yw81F-mkjDRo",
      authDomain: "dbz-barter.firebaseapp.com",
      databaseURL: "https://dbz-barter.firebaseio.com",
      projectId: "dbz-barter",
      storageBucket: "dbz-barter.appspot.com",
      messagingSenderId: "651195865071"
  }
};
