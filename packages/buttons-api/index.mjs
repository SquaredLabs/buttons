import Router from 'koa-router'
import controllers from './controllers'
import guards from './middleware/guards'
import refreshLogin from './middleware/refresh-login'

const router = new Router()

router.use(refreshLogin())

router.use(
  controllers.auth.routes(),
  controllers.auth.allowedMethods()
)

router.use(
  guards.login(),
  controllers.locations.routes(),
  controllers.locations.allowedMethods()
)

router.use(
  guards.login(),
  controllers.users.routes(),
  controllers.users.allowedMethods()
)

export default router
