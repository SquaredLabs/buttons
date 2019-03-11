import _ from 'lodash'
import Router from 'koa-router'
import body from 'koa-body'
import guards from '../middleware/guards'

const userEditableFields = [
  'name',
  'image',
  'LocationId'
]

const adminEditableFields = [
  'netid',
  'name',
  'image',
  'administrator',
  'LocationId'
]

const router = new Router()
router.prefix('/users')

router.param('user', async (id, ctx, next) => {
  ctx.user = await ctx.db.User.findByPk(id)

  if (ctx.user === null) {
    ctx.status = 404
    return
  }

  return next()
})

router.get('/', async ctx => {
  ctx.body = await ctx.db.User.all()
})

router.get('/:user(\\d+)', async ctx => {
  ctx.body = ctx.user
})

router.post('/', guards.admin(), body(), async ctx => {
  await ctx.db.User.create(ctx.request.body, {
    fields: adminEditableFields
  })
  ctx.status = 200
})

router.patch('/:user(\\d+)', guards.self(), body(), async ctx => {
  const isAdministrator = _.get(ctx, 'session.user.administrator', false)
  const fields = isAdministrator
    ? adminEditableFields
    : userEditableFields
  await ctx.user.update(ctx.request.body, {
    where: { id: ctx.params.id },
    fields
  })
  ctx.status = 200
})

router.delete('/:user(\\d+)', guards.admin(), body(), async ctx => {
  await ctx.user.destroy()
  ctx.status = 200
})

export default router
