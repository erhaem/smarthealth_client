import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import Cookies from 'js-cookie'
import snakecaseKeys from 'snakecase-keys'

const Api = {
  init() {
    axios.defaults.baseURL =
      'https://rafliseptiannn25.web.ti.polindra.ac.id/smarthealth_api/public/api'
    // 'https://api.rafliseptiannn25.web.ti.polindra.ac.id/smarthealth_api/public/api'

    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    axios.defaults.headers.common.Authorization = 'Bearer ' + Cookies.get('token')
  },
  setAccessControl() {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    axios.defaults.headers.common['Cache-Control'] = 'no-cache, private'
    axios.defaults.headers.common['Access-Control-Allow-Method'] = ['GET', 'POST', 'PUT', 'DELETE']
  },
  setHeaderMultipartFormData() {
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  },
  get(resource, params) {
    return axios.get(`${resource}`, {
      params,
      transformResponse: [
        (data) => {
          return camelcaseKeys(JSON.parse(data), { deep: true })
        }
      ]
    })
  },
  post(resource, params) {
    return axios.post(`${resource}`, snakecaseKeys(params, { deep: true }), {
      transformResponse: [
        (data) => {
          if (data) {
            return camelcaseKeys(JSON.parse(data), {
              deep: true
            })
          }
        }
      ]
    })
  },
  postFormData(resource, params) {
    return axios.post(`${resource}`, params)
  },
  delete(resource) {
    return axios.delete(resource)
  },
  update(resource, slug, params) {
    return axios.put(`${resource}/${slug}`, snakecaseKeys(params, { deep: true }))
  },
  updateFormData(resource, params) {
    console.log(resource, params)
    return axios.put(`${resource}`, params, {
      transformResponse: [
        (data) => {
          if (data) {
            return camelcaseKeys(JSON.parse(data), { deep: true })
          }
        }
      ]
    })
  },

  put(resource, params) {
    return axios.put(`${resource}`, snakecaseKeys(params, { deep: true }))
  },
  getFile(resource, params) {
    return axios.get(`${resource}`, {
      responseType: 'blob',
      params: params
    })
  }
}

export default Api
