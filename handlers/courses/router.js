var Router = require('koa-router');

var router = module.exports = new Router();

router.get('/', require('./controller/frontpage').get);
router.get('/:course', require('./controller/course').get);
router.get('/signup/:group', require('./controller/signup').get);
router.get('/orders/:orderNumber(\\d+)', require('./controller/signup').get);

//var newOrder = require('./controller/newOrder');
//var orders = require('./controller/orders');

//router.get('/', newOrder.get);

