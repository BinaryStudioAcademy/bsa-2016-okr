# bsa-2016-okr

Requires global packages

* `rimraf`
* `webpack`
* `cross-env`

``` npm install -g rimraf webpack cross-env ```

To start the project for development run

``` npm runt start ```

To start the project in production mode you need running auth server on port 2020 and run:

* ``` npm run build:local  ```
* ``` npm run dev:prod ```

To run automated tests run:

``` npm run test ```

P.S. Tests wasn't maintained since start of September

If there are any errors with sass/scss:

``` npm rebuild node-sass ```

Then run ``` npm start ``` again

To start the project on production run

``` npm install && npm run build && npm run prod ```
