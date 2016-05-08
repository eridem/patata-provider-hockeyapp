"use strict";

var Q = require('q');

function PatataProviderHockeyApp(options) {
    this.token = options.token;
    this.app = options.app;
}

PatataProviderHockeyApp.prototype.getBin = function() {
    var deferred = Q.defer();        

    var HockeyApp = require('hockeyapp-api-wrapper');
 
    // HockeyApp settings
    var hockeyAppToken = this.token;
    var hockeyAppApp = this.app;
    
    // Init client
    var hockeyAppCli = new HockeyApp.Client(hockeyAppToken);
    
    hockeyAppCli.getApps().then(function(appsResponse) {
        var app = HockeyApp.Utils.getAppByTitleMatch(appsResponse, hockeyAppApp);
    
        hockeyAppCli.getVersions(app).then(function(versionResponse) {
            var version = HockeyApp.Utils.getLatestVersion(versionResponse);    
            var downloadUrl = hockeyAppCli.getLatestAndroidVersionDownloadLink(app, version);
    
            deferred.resolve(downloadUrl);
        });
    });
    
    return deferred.promise;
}

module.exports = PatataProviderHockeyApp;