import Cas from 'koa2-cas'

const cas = new Cas({
  cas_url: 'https://login.uconn.edu/cas',
  service_url: process.env.CAS_SERVICE,
  cas_version: '2.0',
  renew: true,
  session_name: 'netid',
  is_dev_mode: process.env.NODE_ENV === 'development' && process.env.CAS_DEV_USER,
  dev_mode_user: process.env.CAS_DEV_USER
})

export default cas
