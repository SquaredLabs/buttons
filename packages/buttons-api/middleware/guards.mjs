import _ from 'lodash'

const generic = predicate => () => (ctx, next) => {
  if (predicate(ctx)) {
    return next()
  } else {
    ctx.status = 403
  }
}

const admin = generic(ctx =>
  _.get(ctx, 'session.user.administrator', false))

const self = generic(ctx =>
  _.get(ctx, 'session.user.id', null) === ctx.user.id ||
  _.get(ctx, 'session.user.administrator', false))

const login = generic(ctx =>
  _.get(ctx, 'session.user.id', null) > 0)

export default {
  admin,
  login,
  self
}
