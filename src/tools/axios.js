import axios from 'axios'
import baseURL from '../baseUrl'
const CancelToken = axios.CancelToken
const instance = axios.create({
  baseURL: baseURL.prod,
  timeout: 30 * 1000
})
instance.defaults.headers.post['Content-type'] = 'application/json'
const pending = []
const removePending = config => {
  for (const p in pending) {
    if (pending[p].u === config.url + '&' + config.method) {
      pending[p].f()
      pending.splice(parseInt(p, 10), 1)
    }
  }
}
instance.interceptors.request.use(config => {
  removePending(config)
  config.cancelToken = new CancelToken(c => {
    pending.push({
      u: config.url + '&' + config.method,
      f: c
    })
  })
  return config
})

instance.interceptors.response.use(
  response => response,
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '400 Bad Request'
          break
        case 401:
          error.message = '401 Unauthorized'
          window.location.href = '/login'
          break
        case 403:
          error.message = '403 Forbidden'
          break
        case 404:
          error.message = '404 Not Found'
          break
        case 500:
          error.message = '500 Internal Server Error'
          break
        case 502:
          error.message = '502 Bad Gateway'
          break
        case 504:
          error.message = '504 Internal Server Error'
          break
        default:
          error.message = `Unkown error and the status code is ${
            error.response.status
          }`
      }
    } else {
      error.message = 'Unkown error'
    }
    return Promise.reject(error.message)
  }
)
export const GET = (url, params = {}, errMsg) => {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      err = errMsg || err
      reject(err)
    })
  })
}

export const POST = (url, params = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params, config)
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        reject(err)
      })
  })
}

export const PUT = (url, params = {}, errMsg) => {
  return new Promise((resolve, reject) => {
    instance
      .put(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        err = errMsg || err
        reject(err)
      })
  })
}

export const DELETE = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, {
        data: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
