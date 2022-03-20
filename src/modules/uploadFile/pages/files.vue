<template>
  <v-container>
    <v-row>
      <v-col>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Filename
                </th>
                <th class="text-left">
                  Upload date
                </th>
                <th class="text-left">
                  Size
                </th>
                <th class="text-left">
                  link
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="file in files"
                :key="file._id"
              >
                <td>{{ file.name }}</td>
                <td>{{ new Date(file.createdAt).toLocaleString() }}</td>
                <td>{{ getSize(file.size) }}</td>
                <td>
                  <a
                    :href="staticUrl + file.link"
                    :download="file.name"
                    target="_blank"
                  >
                    Download
                  </a>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import FileService from '@/modules/uploadFile/service.js'

export default {
  name: 'FileList',
  data() {
    return {
      staticUrl: process.env.VUE_APP_STATIC_URL,
      files: [],
    }
  },
  async created() {
    this.files = await FileService.getFiles()
  },
  methods: {
    getSize(size) {
      return FileService.fileSizeString(size)
    },
  },
}
</script>
<style></style>
