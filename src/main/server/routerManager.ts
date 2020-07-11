import router from './router'
import {
  uploadWithClipboardFiles,
  uploadWithFiles
} from '@core/bus/apis'
import {
  handleResponse
} from './utils'
import logger from '@core/picgo/logger'

router.post('/upload', async ({
  response,
  list = []
} : {
  response: IHttpResponse,
  list?: string[]
}): Promise<void> => {
  try {
    if (list.length === 0) {
      // upload with clipboard
      const res = await uploadWithClipboardFiles()
      if (res.success) {
        handleResponse({
          response,
          body: {
            success: true,
            result: res.result
          }
        })
      } else {
        handleResponse({
          response
        })
      }
    } else {
      //  upload with files
      const pathList = list.map(item => {
        return {
          path: item
        }
      })
      const res = await uploadWithFiles(pathList)
      if (res.success) {
        handleResponse({
          response,
          body: {
            success: true,
            result: res.result
          }
        })
      } else {
        handleResponse({
          response
        })
      }
    }
  } catch (err) {
    logger.error(err)
    handleResponse({
      response,
      body: {
        success: false,
        message: err
      }
    })
  }
})

router.post('/heartbeat', async ({
  response
} : {
  response: IHttpResponse,
}) => {
  handleResponse({
    response,
    body: {
      success: true,
      result: 'alive'
    }
  })
})

export default router
