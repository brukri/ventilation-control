import Koa from 'koa';
import Router from 'koa-router';

import api from './ventilation-control/api';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import VentilationControlError from './ventilation-control/ventilation-control-error';

const SERVER_PORT = 8080;

const app = new Koa();
const router = new Router();

app.use(logger());
app.use(json());
app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err instanceof VentilationControlError) {
            ctx.status = 400;
        } else {
            ctx.status = err.status || err.code || 500;
        }
        ctx.body = {
            success: false,
            message: err.message,
        };
    }
});

router.use('/ventilation-control', api.routes());
app.use(router.routes());

app.listen(SERVER_PORT, () => {
    console.log(`Server started on port: ${SERVER_PORT}`);
});
