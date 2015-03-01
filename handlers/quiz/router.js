var Router = require('koa-router');

var index = require('./controllers/index');
var start = require('./controllers/start');
var answer = require('./controllers/answer');
var quiz = require('./controllers/quiz');

var router = module.exports = new Router();

router.get("/", index.get);
router.post("/start/:slug", start.post);
router.post("/answer/:slug", answer.post);
router.get("/:slug", quiz.get);

