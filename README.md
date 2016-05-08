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
        app: 'YOUR HOCKEY APP TITLE'
    },
        
});
```

Where:

- ```package```: this package as required.
- ```token```: API token that can be obtained from HockeyApp (more info below).
- ```app```: application to test (more info below).

## Token

Token can be obtained on your [HockeyApp profile page](https://rink.hockeyapp.net/manage/auth_tokens):

![HockeyApp token](https://bytebucket.org/patataio/patata-provider-hockeyapp/raw/f8865fc90685e87dddda6260639c1c8b2e05b921/doc/hockeyapp-token.jpg)

## App

The ```app``` value is the title of the app to test:

![HockeyApp token](https://bytebucket.org/patataio/patata-provider-hockeyapp/raw/f8865fc90685e87dddda6260639c1c8b2e05b921/doc/hockeyapp-app.jpg)