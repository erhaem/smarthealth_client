import { reject } from 'lodash'
import Api from './api'

const process = {
  actions: {
    getData(context, param) {
      let fixedParams = ''

      const currentParams = Object.keys(param[1])
      if (currentParams.length > 0) {
        fixedParams = currentParams.map((key) => `${key}=${currentParams[key]}`).join('&')
      }

      return new Promise((resolve) => {
        Api.init()
        Api.get(param[0] + fixedParams).then(
          (response) => {
            resolve(response.data)
          },
          (error) => {
            reject(error)
          }
        )
      })
    },
    showData(context, param) {
      return new Promise((resolve) => {
        Api.init()
        Api.get(param[0] + '/' + param[1]).then(
          (response) => {
            resolve(response.data)
          },
          (error) => {
            reject(error)
          }
        )
      })
    },
    postData(context, param) {
      return new Promise((resolve, reject) => {
        Api.init()
        Api.post(param[0], param[1]).then(
          (response) => {
            resolve(response.data)
          },
          (error) => {
            reject(error)
          }
        )
      })
    },
    postDataUpload(context, param) {
      return new Promise((resolve) => {
        Api.init()
        Api.postFormData(param[0], param[1]).then(
          (response) => {
            resolve(response.data)
          },
          (error) => {
            reject(error)
          }
        )
      })
    },
    // postDataUpload(context, payload) {
    //     return new Promise((resolve, reject) => {
    //       Api.init();
    //       Api.postFormData(payload.url, payload.formData)
    //         .then((response) => {
    //           resolve(response.data);
    //         })
    //         .catch((error) => {
    //           reject(error);
    //         });
    //     });
    //   },
    updateData(state, param) {
      return new Promise((resolve) => {
        Api.init()
        Api.update(param[0], param[1], param[2]).then(
          (response) => {
            resolve(response.data)
          },
          (error) => {
            reject(error)
          }
        )
      })
    },
    putData(state, param) {
      return new Promise((resolve) => {
        Api.init()
        Api.put(param[0], param[1], param[2]).then(
          (response) => {
            resolve(response.data)
          },
          (error) => {
            reject(error)
          }
        )
      })
    },
    putDataUpload(state, param) {
      return new Promise((resolve) => {
        Api.init()
        Api.updateFormData(param[1], param[0]).then(
          (response) => {
            resolve(response.data)
          },
          (error) => {
            reject(error)
          }
        )
      })
    },
    deleteData(context, param) {
      return new Promise((resolve) => {
        Api.init()
        Api.delete(param[0] + `/${param[1]}`).then(
          (response) => {
            resolve(response.data)
          },
          (error) => {
            reject(error.response)
          }
        )
      })
    },
    async getFile(context, param) {
      Api.init()
      // Api.getFile(param[0]+'?'+param[1]).then(
      const response = await Api.getFile(param[0] + '?' + param[1])
      let blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel'
      })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'example.xlsx'
      link.click()
    }
  }
}

export default process
