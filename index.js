"use strict";
var Q = require('q');

class PatataProviderHockeyApp {
    constructor(options, HockeyAppModule) {
        this.HockeyAppModule = HockeyAppModule || require('hockeyapp-api-wrapper');
        this.token = options.token;
        this.app = options.app;
        this.id = options.id;
        this.extension = options.extension;
        
        this.validateOptions();
    }
    
    validateOptions() {
        if (!this.token) {
            throw new Error("[Error] Invalid arguments. You missed 'token'");
        }
        if (!this.token.match(/[a-f0-9]{32}/gi)) {
            throw new Error("[Error] Invalid arguments. You 'token' must have the following format: /[a-f0-9]{32}/");
        }
        if (!this.app && !this.id) {
            throw new Error("[Error] Invalid arguments. You missed 'app' and 'id'. You must choose one");
        }
        if (this.app && this.id) {
            throw new Error("[Error] Invalid arguments. You cannot have 'app' and 'id'. You must choose one");
        }
        if (this.id && !this.id.match(/[a-f0-9]{32}/gi)) {
            throw new Error("[Error] Invalid arguments. Your 'id' must have the following format: /[a-f0-9]{32}/");
        }
        if (!this.extension) {
            throw new Error("[Error] Invalid arguments. You missed \'extension\' or is empty");
        }
        if (!this.extension) {
            throw new Error("[Error] You need to define the extension. E.g. 'apk', 'ipa', ...");
        }
    }
    
    getBin() {
        let deferred = Q.defer();
        
        let hockeyAppCli = new this.HockeyAppModule.Client(this.token);
        
        hockeyAppCli.getApps().then((appsResponse) => {
            var selectedApp;
            if (this.id) {
                selectedApp = this.HockeyAppModule.Utils.getAppByIdMatch(appsResponse, this.id);
            } else if (this.app) {
                selectedApp = this.HockeyAppModule.Utils.getAppByTitleMatch(appsResponse, this.app);
            }
        
            if (!selectedApp) {
                return deferred.reject('[Error] App not found');
            }
        
            hockeyAppCli.getVersions(selectedApp).then((versionResponse) => {
                let version = this.HockeyAppModule.Utils.getLatestVersion(versionResponse);
                
                if (!version) {
                    return deferred.reject('[Error] Latest version of the app not found');
                }
                
                let downloadUrl = hockeyAppCli.getLatestAndroidVersionDownloadLink(selectedApp, version, this.extension);
        
                deferred.resolve(downloadUrl);
            }).catch(function(error) {
                deferred.reject(error);
            });
        }).catch(function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
}

module.exports = PatataProviderHockeyApp;