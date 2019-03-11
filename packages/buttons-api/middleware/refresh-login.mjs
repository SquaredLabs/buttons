import _ from 'lodash'

export default () => async (ctx, next) => {
  const id = _.get(ctx, 'session.user.id', null)
  if (id) {
    ctx.session.user = await ctx.db.User.findByPk(id)
  }
  return next()
}
