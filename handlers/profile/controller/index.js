var config = require('config');
var User = require('users').User;
var mongoose = require('mongoose');
var QuizResult = require('quiz').QuizResult;
var Order = require('payments').Order;

// skips the request unless it's the owner
exports.get = function* (next) {

  if (!this.user) {
    yield* next;
    return;
  }

  // /profile -> /profile/iliakan
  if (!this.params.profileName) {
    this.status = 301;
    this.redirect(`/profile/${this.user.profileName}`);
    return;
  }

  var user = yield User.findOne({profileName: this.params.profileName}).exec();

  if (!user) {
    this.throw(404);
  }

  this.locals.profileStatesEnabled = ['root.aboutme', 'root.account'];

  var hasQuizResult = yield QuizResult.findOne({user: user._id}).exec();

  if (hasQuizResult) {
    this.locals.profileStatesEnabled.push('root.quiz');
  }

  var hasOrders = yield Order.findOne({user: user._id}).exec();

  if (hasOrders) {
    this.locals.profileStatesEnabled.push('root.orders');
  }


  // if the visitor is the profile owner
  if (String(this.user._id) == String(user._id)) {

    this.locals.title = this.user.displayName;

    this.body = this.render('index');
  } else {
    yield* next;
  }

};

