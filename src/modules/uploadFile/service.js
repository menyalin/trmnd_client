import api from '@/api'
const SIZE_UNITS = ['byte', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']

class UploadFileService {
  async sendFile(file) {
    const fd = new FormData()
    fd.append('file', file)
    const data = await api.post('/upload', fd)
    return data
  }
  async getFileByName(name) {
    const { data } = await api.get('/files/'+ name)
    return data 
  }

  async getFiles() {
    const { data } = await api.get('/files')
    return data
  }

  fileSizeString(bytes) {
    const digits = bytes.toString().length
    const exp = Math.floor((digits - 1) / 3)
    const value = (bytes / 1000 ** exp).toFixed()
    return `${value} ${SIZE_UNITS[exp]}`
  }
}

export default new UploadFileService()
