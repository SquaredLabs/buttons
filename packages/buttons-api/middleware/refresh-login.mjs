import _ from 'lodash'

export default () => async (ctx, next) => {
  const id = _.get(ctx, 'session.user.id', null)
  if (id) {
    try {
      ctx.session.user = await ctx.db.User.findByPkForSession(id)
    } catch (err) {
      ctx.session = null
      throw err
    }
  }
  return next()
}
