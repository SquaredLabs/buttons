import Router from 'koa-router'
import CSRF from 'koa-csrf'
import controllers from './controllers'
import guards from './middleware/guards'
import refreshLogin from './middleware/refresh-login'

const router = new Router()

router.use(new CSRF())
router.use((ctx, next) => {
  ctx.session.csrfToken = ctx.csrf
  return next()
})

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
