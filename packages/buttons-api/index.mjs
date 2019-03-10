import Router from 'koa-router'
import controllers from './controllers'

const router = new Router()

for (const controller of controllers) {
  router.use(controller.routes(), controller.allowedMethods())
}

export default router
