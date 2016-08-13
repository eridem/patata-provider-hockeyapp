import chai from 'chai';
import path from 'path';

let expect = chai.expect
  , should = chai.should()
  , assert = chai.assert;

let HockeyAppProvider = require(path.join(__dirname, '..', 'index'));

describe('PatataProviderHockeyApp', function() {
  describe('constructor', function () {
    let invalidToken = "abc123";
    let validToken = "aaaabbbbccccdddd0000111122223333";
    let validId = "aaaabbbbccccdddd0000111122223333";
    let invalidId = "abc123";
    let validApp = "abc";
    let invalidApp = "";
    let validExtension = "apk";
    let invalidExtension = "";
        
    it('should raise exception if not token exists', function () {
      (() => new HockeyAppProvider({})).should.throw(Error, "[PatataProviderHockeyApp][Error] Invalid arguments. You missed 'token'");
    });
    it('should raise exception if token is invalid', function () {
      (() => new HockeyAppProvider({ token : invalidToken })).should.throw(Error, "[PatataProviderHockeyApp][Error] Invalid arguments. You 'token' must have the following format: /[a-f0-9]{32}/");
    });
    it('should raise exception if not app or id exists', function () {
      expect(() => new HockeyAppProvider({ token: validToken })).to.throw(Error, "[PatataProviderHockeyApp][Error] Invalid arguments. You missed 'app' and 'id'. You must choose one");
    });
    it('should raise exception if both app and id exists', function () {
      expect(() => new HockeyAppProvider({ token: validToken, id: validId, app: validApp })).to.throw(Error, "[PatataProviderHockeyApp][Error] Invalid arguments. You cannot have 'app' and 'id'. You must choose one");
    });
    it('should raise exception if id is invalid', function () {
      (() => new HockeyAppProvider({ token : validToken, id: invalidId })).should.throw(Error, "[PatataProviderHockeyApp][Error] Invalid arguments. Your 'id' must have the following format: /[a-f0-9]{32}/");
    });
    it('should raise exception if app is invalid', function () {
      (() => new HockeyAppProvider({ token : validToken, app: invalidApp })).should.throw(Error, "[PatataProviderHockeyApp][Error] Invalid arguments. You missed \'app\' and \'id\'. You must choose one");
    });
    it('should raise exception if extension is invalid', function () {
      (() => new HockeyAppProvider({ token : validToken, app: validApp, extension: invalidExtension })).should.throw(Error, "[PatataProviderHockeyApp][Error] Invalid arguments. You missed \'extension\' or is empty");
    });       
    it('should not raise exception if all arguments are valid', function () {
      (() => new HockeyAppProvider({ token : validToken, app: validApp, extension: validExtension })).should.not.throw(Error);
    });
  });
});