import Router from 'koa-router';
import { Validation } from 'koa2-validation';
import Joi from '@hapi/joi';
import { adjustVentilationLevel } from './service';

const validator = new Validation(Joi);
const validate = validator.validate.bind(validator);

const router = new Router();

router.post(
    '/level/:level',
    validate({
        body: {},
        params: {level: Joi.number().required()}
    }),
    async (ctx) => {
        const { params } = ctx;
        const { level } = params;

        console.log(level);

        adjustVentilationLevel(Number.parseInt(level));

        ctx.status = 200;
        ctx.body = {};
    }
);

export default router;
