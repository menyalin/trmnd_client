<template>
  <v-container>
    <v-row>
      <v-col class="card-wrapper">
        <v-alert
          v-if="message"
          :type="messageType"
          dismissible
        >
          {{ message }}
        </v-alert>
        <v-card
          elevation="2"
          max-width="800px"
        >
          <v-card-title> Select file to upload </v-card-title>
          <v-card-text>
            <div
              class="drop-zone"
              :class="{ dragover: dragOver }"
              @dragenter.capture="dragenterHandler"
              @dragleave.capture="dragleaveHandler"
              @dragover.prevent="dragoverHandler"
              @drop.prevent="dropFileHandler"
            >
              <span>Drop files here or click to upload</span>
            </div>

            <v-file-input
              v-model="file"
              show-size
              label="Select file"
              truncate-length="50"
              :errorMessages="errorMessages"
            />
            <div
              v-if="file"
              class="mt-3"
            >
              <v-btn
                color="primary"
                :disabled="!validFileSize"
                :loading="loading"
                @click="send"
              >
                <v-icon left>
                  mdi-tray-arrow-up
                </v-icon>
                Upload
              </v-btn>
            </div>
            <div
              v-if="link"
              class="mt-4"
            >
              <div class="text-h6">
                {{ link.name }}
              </div>
              <div class="attr-row">
                <div>
                  Upload date: {{ new Date(link.createdAt).toLocaleString() }}
                </div>
                <div>size: {{ getSize(link.size) }}</div>
                <div>
                  <a
                    :href="staticUrl + link.link"
                    :download="link.name"
                    target="_blank"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UploadFileService from '../service.js'

export default {
  name: 'UploadFile',
  data() {
    return {
      file: null,
      dragOver: false,
      loading: false,
      message: null,
      messageType: null,
      link: null,
      staticUrl: process.env.VUE_APP_STATIC_URL,
    }
  },
  computed: {
    validFileSize() {
      return this.file ? this.file.size < 5242880 : true
    },
    errorMessages() {
      if (this.file && !this.validFileSize)
        return ['The file must be less than 5MB']
      return null
    },
  },
  methods: {
    getSize(size) {
      return UploadFileService.fileSizeString(size)
    },
    async send() {
      try {
        this.loading = true
        this.messageType = null
        this.message = null
        this.link = null
        const { status, data } = await UploadFileService.sendFile(this.file)
        this.loading = false
        if (status === 201) {
          this.messageType = 'success'
          this.message = 'File uploaded successfully '
          this.link = data
        }
      } catch (e) {
        this.loading = false
        if (e.response.status === 409) {
          this.message = e.response?.data
          this.messageType = 'error'
          this.link = await UploadFileService.getFileByName(this.file.name)
        }
        console.log(e.response)
      }
    },
    dragoverHandler(e) {
      this.dragOver = true
      e.dataTransfer.dropEffect = 'copy'
      return false
    },
    dropFileHandler(e) {
      this.dragOver = false
      this.file = e.dataTransfer.files[0]
    },
    dragenterHandler() {
      this.dragOver = true
    },
    dragleaveHandler() {
      this.dragOver = false
    },
  },
}
</script>
<style scoped>
.card-wrapper {
  max-width: 800px;
  padding: 10px;
  margin: 0 auto;
  margin-top: 30px;
}
.drop-zone {
  width: 100%;
  height: 150px;
  border: 1px dotted grey;
  border-radius: 5px;
  background-color: beige;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.dragover {
  background-color: aquamarine;
}
.attr-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
