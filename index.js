"use strict";

var Q = require('q');

function PatataProviderHockeyApp(options) {
    this.token = options.token;
    this.app = options.app;
    this.id = options.id;
}

PatataProviderHockeyApp.prototype.getBin = function() {
    var deferred = Q.defer();        

    var HockeyApp = require('hockeyapp-api-wrapper');
 
    // HockeyApp settings
    var hockeyAppToken = this.token;
    var hockeyAppTitle = this.app;
    var hockeyAppId = this.id;
    
    // Init client
    var hockeyAppCli = new HockeyApp.Client(hockeyAppToken);
    
    hockeyAppCli.getApps().then(function(appsResponse) {
        var app;
        if (this.hockeyAppId) {
            app = HockeyApp.Utils.getAppByIdMatch(appsResponse, hockeyAppId);
        } else if (this.hockeyAppTitle) {
            app = HockeyApp.Utils.getAppByTitleMatch(appsResponse, hockeyAppTitle);
        }
    
        hockeyAppCli.getVersions(app).then(function(versionResponse) {
            var version = HockeyApp.Utils.getLatestVersion(versionResponse);    
            var downloadUrl = hockeyAppCli.getLatestAndroidVersionDownloadLink(app, version);
    
            deferred.resolve(downloadUrl);
        });
    });
    
    return deferred.promise;
}

module.exports = PatataProviderHockeyApp;