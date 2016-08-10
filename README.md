# bsa-2016-okr

Requires global packages

* `rimraf`
* `webpack`
* `cross-env`

``` npm install -g rimraf webpack cross-env ```

To start the project for development run

``` npm start ```

To start the project in production mode run:

* ``` npm run build ```
* ``` npm run prod ```

P.S. Can be used for ONLY BACKEND development ( to avoid looooong webpack hot reload )

To run automated tests run:

``` npm run test ```

If there are any errors with sass/scss:

``` npm rebuild node-sass ```

Then run ``` npm start ``` again

To start the project on production run

``` npm run build && node server ```
