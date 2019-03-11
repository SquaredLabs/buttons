import Router from 'koa-router'
import body from 'koa-body'
import guards from '../middleware/guards'

const adminEditableFields = [ 'name', 'image' ]

const router = new Router()
router.prefix('/locations')

router.param('location', async (id, ctx, next) => {
  ctx.location = await ctx.db.Location.findByPk(id)

  if (ctx.location === null) {
    ctx.status = 404
    return
  }

  return next()
})

router.get('/', async ctx => {
  ctx.body = await ctx.db.Location.all()
})

router.get('/:location(\\d+)', async ctx => {
  ctx.body = ctx.location
})

router.post('/', guards.admin(), body(), async ctx => {
  await ctx.db.Location.create(ctx.request.body, {
    fields: adminEditableFields
  })
  ctx.status = 200
})

router.patch('/:location(\\d+)', guards.admin(), body(), async ctx => {
  await ctx.location.update(ctx.request.body, {
    where: { id: ctx.params.id },
    fields: adminEditableFields
  })
  ctx.status = 200
})

router.delete('/:location(\\d+)', guards.admin(), body(), async ctx => {
  await ctx.location.destroy()
  ctx.status = 200
})

export default router
