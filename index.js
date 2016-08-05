'use strict'
const Q = require('q')
const errorMessageFn = function (message) {
  return '[PatataProviderHockeyApp][Error] ' + message
}

class PatataProviderHockeyApp {
  constructor (patata, options, HockeyAppModule) {
    this.patata = patata
    this.log = patata.log
    this.HockeyAppModule = HockeyAppModule || require('hockeyapp-api-wrapper')
    this.token = options.token
    this.app = options.app
    this.id = options.id
    this.extension = options.extension
    this.versionFilter = options.versionFilter

    this.validateOptions()
  }

  validateOptions () {
    if (!this.token) {
      throw this.log.getError(errorMessageFn("Invalid arguments. You missed 'token'"))
    }
    if (!this.token.match(/[a-f0-9]{32}/gi)) {
      throw this.log.getError(errorMessageFn("Invalid arguments. You 'token' must have the following format: /[a-f0-9]{32}/"))
    }
    if (!this.app && !this.id) {
      throw this.log.getError(errorMessageFn("Invalid arguments. You missed 'app' and 'id'. You must choose one"))
    }
    if (this.app && this.id) {
      throw this.log.getError(errorMessageFn("Invalid arguments. You cannot have 'app' and 'id'. You must choose one"))
    }
    if (this.id && !this.id.match(/[a-f0-9]{32}/gi)) {
      throw this.log.getError(errorMessageFn("Invalid arguments. Your 'id' must have the following format: /[a-f0-9]{32}/"))
    }
    if (!this.extension) {
      throw this.log.getError(errorMessageFn("Invalid arguments. You missed 'extension' or is empty"))
    }
    if (!this.extension) {
      throw this.log.getError(errorMessageFn("You need to define the extension. E.g. 'apk', 'ipa', ..."))
    }
    if (this.versionFilter && typeof this.versionFilter !== 'function') {
      throw this.log.getError(errorMessageFn("Version filter must be a function that returns a boolean. E.g. function(version) { return version.title === 'myapp' }"))
    }
  }

  getBin () {
    let deferred = Q.defer()

    let hockeyAppCli = new this.HockeyAppModule.Client(this.token)

    hockeyAppCli.getApps().then((appsResponse) => {
      var selectedApp
      if (this.id) {
        selectedApp = this.HockeyAppModule.Utils.getAppByIdMatch(appsResponse, this.id)
      } else if (this.app) {
        selectedApp = this.HockeyAppModule.Utils.getAppByTitleMatch(appsResponse, this.app)
      }

      if (!selectedApp) {
        return deferred.reject(this.log.getErrorMessage(errorMessageFn('App not found')))
      }

      hockeyAppCli.getVersions(selectedApp).then((versionResponse) => {
        let version = null
        if (this.versionFilter) {
          version = this.HockeyAppModule.Utils.getAppByVersionFilter(versionResponse, this.versionFilter)
        } else {
          version = this.HockeyAppModule.Utils.getLatestVersion(versionResponse)
        }

        if (!version) {
          return deferred.reject(this.log.getErrorMessage(errorMessageFn('Latest version of the app not found')))
        }

        let downloadUrl = hockeyAppCli.getLatestAndroidVersionDownloadLink(selectedApp, version, this.extension)

        deferred.resolve(downloadUrl)
      }).catch(function (error) {
        deferred.reject(error)
      })
    }).catch(function (error) {
      deferred.reject(error)
    })

    return deferred.promise
  }
}

module.exports = PatataProviderHockeyApp
