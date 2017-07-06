<template>
  <main>
    <div v-if="$route.params.id">
      <md-layout md-gutter>
        <md-layout md-flex-xsmall="100" md-flex-small="40" md-flex-medium="40">
        </md-layout>
        <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100">
          <md-card>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">{{projectinfo.name}}</div>
                <div class="md-subhead">{{ msg }}</div>
              </md-card-header-text>
            </md-card-header>
            <md-card-content>
              <form>
                <md-input-container>
                  <label>Project Name</label>
                  <md-input v-model="projectinfo.name"></md-input>
                </md-input-container>
                <md-input-container>
                  <label>Description</label>
                  <md-textarea v-model="projectinfo.description">{{projectinfo.description}}</md-textarea>
                </md-input-container>
                <md-input-container>
                  <label>Value</label>
                  <md-input v-model="projectinfo.value"></md-input>
                </md-input-container>
                <md-input-container>
                  <label>Effort</label>
                  <md-input v-model="projectinfo.effort"></md-input>
                </md-input-container>
                <md-input-container>
                  <label>Status</label>
                  <md-input v-model="projectinfo.status"></md-input>
                </md-input-container>
                <md-input-container>
                  <label>Deadline</label>
                  <md-input v-model="projectinfo.deadline"></md-input>
                </md-input-container>
                <md-input-container>
                  <label>Start date</label>
                  <md-input v-model="projectinfo.start_date"></md-input>
                </md-input-container>
                <md-card-actions>
                  <md-button class="md-raised md-primary" @click.native="$router.push({ name: 'project' })">back</md-button>
                  <button class="md-button md-raised md-primary md-theme-default" type="submit" name="button" v-on:click.prevent="update">Update</button>
                </md-card-actions>
              </form>
            </md-card-content>
          </md-card>
        </md-layout>
        <md-layout md-flex-xsmall="100" md-flex-small="40" md-flex-medium="40">
        </md-layout>
      </md-layout>
    </div>
    <div v-else>
    </div>
    <md-dialog-alert
      :md-content="alert.content"
      :md-ok-text="alert.ok"
      ref="dialog3">
    </md-dialog-alert>
  </main>
</template>
<script>
import axios from 'axios'
// import config from 'config/config'
const config = { headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdG5hbWUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlJvb3QiLCJ0aXRsZSI6IkRlZmF1bHQgVXNlciIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaGFzaGVkX3Bhc3N3b3JkIjpudWxsLCJhZG1pbiI6MSwiaWF0IjoxNDk4MTkwMDMwfQ.WXB6a-qMNpFJvTw0fdg56XsaoioEZSt25g4psajBQH8' } }
export default {
  data: () => ({
    projectinfo: [],
    errors: [],
    msg: 'Project edit',
    alert: {
      content: 'Project Info has been updated!',
      ok: 'OK!'
    }
  }),
  methods: {
    update: function () {
      axios.put('https://ryukyu-social.cleverword.com/projects_service/api/projects/' + this.$route.params.id,
        {
          name: this.projectinfo.name,
          description: this.projectinfo.description,
          value: this.projectinfo.value
        },
        config
      )
      .then(response => {
        this.$refs['dialog3'].open()
      })
      .then(function (response) {
        console.log('saved', response)
      })
      .catch(errors => console.log(errors))
    }
  },
  created () {
    axios.get('https://ryukyu-social.cleverword.com/projects_service/api/projects/' + this.$route.params.id)
    .then(response => {
      this.projectinfo = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
<style scoped>
</style>
