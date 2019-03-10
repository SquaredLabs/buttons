import Router from 'koa-router'

const router = new Router()
router.prefix('/users')

router.get('/', async ctx => {
  ctx.body = 'hello'
})

export default router
