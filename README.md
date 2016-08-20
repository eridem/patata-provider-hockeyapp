[![Build Status](https://travis-ci.org/eridem/patata-provider-hockeyapp.svg?branch=master)](https://travis-ci.org/eridem/patata-provider-hockeyapp)

# HockeyApp provider for Patata

The HockeyApp provider for [Patata](http://patata.io) allow us to test our applications getting the binaries directly from [HockeyApp.net](http://hockeyApp.net).

## How it works

So far, the provider download the latest version of an specific app. In this way, [Patata](http://patata.io) will always test with the latest version published on HockeyApp.

## How to use it

You need a [Patata](https://bitbucket.org/patataio/patata/overview) project already set up and a ```patatafile.js``` in place. Follow the [documentation here](https://bitbucket.org/patataio/patata/overview).

Using the provider section of any suite, add the following code:

```
var PatataProviderHockeyApp = require('patata-provider-hockeyapp');

patata.suite('suite01', {

    provider: {
        package: PatataProviderHockeyApp,
        token: 'aaaabbbbccccdddd0000111122223333',
        id: 'aaaabbbbccccdddd0000111122223333',
        extension: 'apk'
    },
        
});
```

Or by first title match:

```
var PatataProviderHockeyApp = require('patata-provider-hockeyapp');

patata.suite('suite01', {

    provider: {
        package: PatataProviderHockeyApp,
        token: 'aaaabbbbccccdddd0000111122223333',
        app: 'YOUR HOCKEY APP TITLE',
        extension: 'ipa'
    },
        
});
```

Where:

- ```package```: this package as required.
- ```token```: API token that can be obtained from HockeyApp.
- ```id```: application to test by app id.
- ```app```: application to test by title.
- ```extension```: file extension for download. E.g. apk, ipa, ...

