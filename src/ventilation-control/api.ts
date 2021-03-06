import Router from 'koa-router';
import { Validation } from 'koa2-validation';
import Joi from '@hapi/joi';
import { adjustVentilationLevel, getVentilationLevel } from './service';

const validator = new Validation(Joi);
const validate = validator.validate.bind(validator);

const router = new Router();

router.post(
    '/level/:level',
    validate({
        body: {},
        params: { level: Joi.number().required() },
    }),
    async (ctx) => {
        const { params } = ctx;
        const { level } = params;

        console.log(level);

        adjustVentilationLevel(Number.parseInt(level));

        ctx.status = 200;
    }
);

router.get('/level', (ctx) => {
    const level = getVentilationLevel();
    ctx.body = {
        level,
    };
});

export default router;
