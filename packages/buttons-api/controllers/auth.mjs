import Router from 'koa-router'
import cas from '../middleware/cas'

const router = new Router()
router.prefix('/auth')

router.get('/login', cas.bounce, async ctx => {
  const netid = ctx.session.netid
  const [ user ] = await ctx.db.User.findOrCreateByNetidForSession(netid)
  ctx.session.user = user
  ctx.redirect('/')
})

router.get('/logout', async ctx => {
  ctx.session = null
  ctx.redirect('/api/auth/login')
})

export default router
