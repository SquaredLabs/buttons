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
  const locations = await ctx.db.Location.all()
  ctx.body = locations.map(location => ({
    ...location.dataValues,
    image: location.image
      ? `/api/locations/${location.id}/image`
      : null
  }))
})

router.get('/:location(\\d+)', async ctx => {
  ctx.body = {
    ...ctx.location.dataValues,
    image: ctx.location.image
      ? `/api/locations/${ctx.location.id}/image`
      : null
  }
})

router.get('/:location(\\d+)/image', async ctx => {
  if (ctx.location.image && ctx.location.image.length > 0) {
    const matches = ctx.location.image.match(/^data:(.*);base64,(.*)/)
    const contentType = matches[1]
    const payload = matches[2]
    ctx.response.set('Content-Type', contentType)
    ctx.body = Buffer.from(payload, 'base64')
  }
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
