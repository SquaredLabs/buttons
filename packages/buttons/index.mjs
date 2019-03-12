import 'buttons-env'

import Koa from 'koa'
import Router from 'koa-router'
import session from 'koa-session'
import api from 'buttons-api'
import db from 'buttons-db'

if (!process.env.APP_KEY) {
  console.error('Please set the APP_KEY environment variable.')
  process.exit(1)
}

const app = new Koa()

app.keys = [process.env.APP_KEY]
app.context.db = db

app.use(session({
  httpOnly: false
}, app))

const router = new Router()

router.use('/api', api.routes(), api.allowedMethods())
app.use(router.routes(), router.allowedMethods())

app.listen(process.env.LISTEN)
