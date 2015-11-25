import Router from 'koa-router';
import indexCtrl from '../controllers/';
import apiCtrl from '../controllers/api';

const router = new Router();

router
    .get('/404', indexCtrl.notFound)
	.get('/500', indexCtrl.serverError)

    .get('/api', apiCtrl.api)
    .get('/api/initialState', apiCtrl.initialState)
	.get('/api/douban', apiCtrl.douban)

    .get('/*', indexCtrl.index)

export default router;