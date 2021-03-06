var Router = require('koa-router');
var config = require('config');
var register = require('./controller/register');
var verify = require('./controller/verify');
var reverify = require('./controller/reverify');
var disconnect = require('./controller/disconnect');
var forgot = require('./controller/forgot');
var forgotRecover = require('./controller/forgotRecover');
var logout = require('./controller/logout');
var xmpp = require('./controller/xmpp');
var mustBeAuthenticated = require('./lib/mustBeAuthenticated');
var mustNotBeAuthenticated = require('./lib/mustNotBeAuthenticated');
var passport = require('koa-passport');

require('./strategies');

var router = module.exports = new Router();

router.post('/login/local', function*(next) {
  var ctx = this;

  // only callback-form of authenticate allows to assign ctx.body=info if 401
  yield passport.authenticate('local', function*(err, user, info) {
    if (err) throw err;
    if (user === false) {
      ctx.status = 401;
      ctx.body = info;
    } else {
      yield ctx.login(user);
      yield ctx.rememberMe();
      ctx.body = {user: user.getInfoFields() };
    }
  }).call(this, next);

});

router.post('/logout', mustBeAuthenticated, logout.post);

if (process.env.NODE_ENV == 'development') {
  router.get('/out', require('./out').get); // GET logout for DEV
}

router.post('/register', mustNotBeAuthenticated, register.post);
router.post('/forgot', mustNotBeAuthenticated, forgot.post);

router.get('/verify/:verifyEmailToken', verify.get);
router.get('/forgot-recover/:passwordResetToken?', mustNotBeAuthenticated, forgotRecover.get);
router.post('/forgot-recover', forgotRecover.post);

router.post('/reverify', reverify.post);

Object.keys(config.auth.providers).forEach(addProviderRoute);

function addProviderRoute(providerName) {
  var provider = config.auth.providers[providerName];

  // login
  router.get('/login/' + providerName, passport.authenticate(providerName, provider.passportOptions));

  // connect with existing profile
  router.get('/connect/' + providerName, mustBeAuthenticated, passport.authorize(providerName, provider.passportOptions));


  // http://stage.javascript.ru/auth/callback/facebook?error=access_denied&error_code=200&error_description=Permissions+error&error_reason=user_denied#_=_

  router.get('/callback/' + providerName, function*(next) {
    var ctx = this;

    yield passport.authenticate(providerName, function*(err, user, info) {
      if (err) {
        // throw err would get swallowed (!!!)
        // so I must render error here
        ctx.renderError(err);
        return;
      }

      if (user) {
        yield ctx.login(user);
        yield ctx.rememberMe();
        ctx.body = ctx.render('popup-success');
        return;
      }

      var reason = info.message || info;

      ctx.body = ctx.render('popup-failure', { reason: reason });

    }).call(this, next);

    yield* next;
  });
  /*
  router.get('/callback/' + providerName, passport.authenticate(providerName, {
      failureMessage:  true,
      successRedirect: '/auth/popup-success',
      failureRedirect: '/auth/popup-failure'
    })

  );*/
}

// disconnect with existing profile
router.post('/disconnect/:providerName', mustBeAuthenticated, disconnect.post);

router.post('/xmpp', xmpp.post);
