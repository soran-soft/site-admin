import 'babel/polyfill';

import path from 'path';
import koa from 'koa';
import views from 'koa-views';
import serve from 'koa-static';
import router from './routes/';

const app = koa();

app.use(serve(path.join(__dirname, '../../static')));

app.use(views(path.join(__dirname, '../../views'), {
    cache: true,
    default: 'ejs',
    map: {
        tpl: 'ejs'
    }
}));

app.use(router.routes());

app.listen(3000, function() {
    console.log('Koa listening at 3000');
});

export default app;
