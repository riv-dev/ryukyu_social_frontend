<template>
  <main>
    <md-layout md-gutter>
      <md-layout md-flex-xsmall="100" md-flex-small="40" md-flex-medium="40">
      </md-layout>
      <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100">
        <md-card>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{userinfo.firstname}} {{ userinfo.lastname }}</div>
              <div class="md-subhead">{{ msg }}</div>
            </md-card-header-text>
          </md-card-header>
          <md-card-content>
            <form>
              <md-input-container>
                <label>Lastname</label>
                <md-input v-model="userinfo.lastname"></md-input>
              </md-input-container>
              <md-input-container>
                <label>Firstname</label>
                <md-input v-model="userinfo.firstname"></md-input>
              </md-input-container>
              <md-input-container>
                <label>Title</label>
                <md-input v-model="userinfo.title"></md-input>
              </md-input-container>
              <md-input-container>
                <label>Email</label>
                <md-input v-model="userinfo.email"></md-input>
              </md-input-container>
              <md-input-container>
                <label>Admin</label>
                <md-input v-model="userinfo.admin"></md-input>
              </md-input-container>
              <md-card-actions>
                <md-button class="md-raised md-primary" @click.native="$router.push({ name: 'user-info' })">back</md-button>
                <button  class="md-button md-raised md-primary md-theme-default" type="submit" name="button" v-on:click.prevent="update">Update</button>
              </md-card-actions>
            </form>
          </md-card-content>
        </md-card>
      </md-layout>
      <md-layout md-flex-xsmall="100" md-flex-small="40" md-flex-medium="40">
      </md-layout>
    </md-layout>

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
    userinfo: [],
    errors: [],
    msg: 'User edit',
    alert: {
      content: 'Your Info has been updated!',
      ok: 'OK!'
    }
  }),
  methods: {
    update: function () {
      // var data = this.users
      axios.put('https://ryukyu-social.cleverword.com/users_service/api/users/' + this.$route.params.id,
        {
          firstName: this.userinfo.firstname,
          lastName: this.userinfo.lastname,
          title: this.userinfo.title,
          email: this.userinfo.email,
          admin: this.userinfo.admin
        },
        config
      )
      .then(response => {
        // JSON responses are automatically parsed.
        this.$refs['dialog3'].open()
      })
      .then(function (response) {
        console.log('saved', response)
      })
      .catch(errors => console.log(errors))
    }
  },
  created () {
    axios.get('https://ryukyu-social.cleverword.com/users_service/api/users/' + this.$route.params.id)
    .then(response => {
      this.userinfo = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
<style scoped>
</style>
