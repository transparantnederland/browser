# Transparant Nederland Relationizer [![Build Status](https://travis-ci.org/transparantnederland/browser.svg)](https://travis-ci.org/transparantnederland/browser) [![Zenhub](https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)](https://zenhub.io)

A browser for [Transparant Nederland](https://transparantnederland.nl/) data. Option to flag wrong or incomplete data.

## Install

```shell
npm install
```

## Develop

```shell
npm start
```

This will run a development server on [http://localhost:3000](http://localhost:3000).

```shell
npm run lint
```
It is recommended that you add an [ESLint](http://eslint.org/) plugin to your preferred code editor, but you can also use this command.

```shell
npm test
npm run test:watch
```
Run a handful of unit tests.

## Deploy

First, add a remote to your git config. You only need to do this once.

```shell
git remote add production ssh://transparantnederland.nl/var/repo/browser.git
```

Then push your latest commits to the production remote.

```shell
git push production master
```

This will automatically update the files on the production server, install any dependencies, and make a new build. Currently the instance still needs to be manually restarted on the server after this process is complete.

Copyright (C) 2016 [Waag Society](http://waag.org).
