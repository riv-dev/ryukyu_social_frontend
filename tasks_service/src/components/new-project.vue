<template>
  <main>
    <md-layout md-gutter>
      <md-layout md-flex-xsmall="100" md-flex-small="40" md-flex-medium="40">
      </md-layout>
      <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100">
        <md-card>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{ msg }}</div>
              <div class="md-subhead">Fill input field</div>
            </md-card-header-text>
          </md-card-header>
          <md-card-content>
            <form>
              <md-input-container>
                <label>Lastname</label>
                <md-input v-model="usernew.lastname"></md-input>
              </md-input-container>
              <md-input-container>
                <label>Firstname</label>
                <md-input v-model="usernew.firstname"></md-input>
              </md-input-container>
              <md-input-container>
                <label>Title</label>
                <md-input v-model="usernew.title"></md-input>
              </md-input-container>
              <md-input-container>
                <label>Email</label>
                <md-input v-model="usernew.email"></md-input>
              </md-input-container>
              <md-input-container>
                <label>Admin</label>
                <md-input v-model="usernew.admin"></md-input>
              </md-input-container>
              <md-input-container md-has-password>
                <label>Password</label>
                <md-input type="password" v-model="usernew.password"></md-input>
              </md-input-container>
              <md-card-actions>
                <md-button class="md-raised md-primary" @click.native="$router.push({ name: 'user' })">back</md-button>
                <button  class="md-button md-raised md-primary md-theme-default" type="submit" name="button" v-on:click.prevent="addNewUser">Add New</button>
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
    usernew: [],
    errors: [],
    msg: 'New Project',
    alert: {
      content: 'Your has been Add new project!',
      ok: 'OK!'
    }
  }),
  methods: {
    addNewUser: function () {
      // var data = this.users
      axios.post('https://ryukyu-social.cleverword.com/users_service/api/users/',
        {
          firstname: this.usernew.firstname,
          lastname: this.usernew.lastname,
          title: this.usernew.title,
          email: this.usernew.email,
          admin: this.usernew.admin,
          password: this.usernew.password
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
  }
}
</script>
<style scoped>
</style>
