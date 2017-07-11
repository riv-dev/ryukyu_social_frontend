<template>
  <md-layout :md-gutter="8">
    <md-layout>
    </md-layout>
    <md-layout>
      <md-card>
        <md-toolbar class="md-dense">
          <h2 class="md-title" style="flex: 1">{{user.firstname}} {{user.lastname}} {{ msg }}</h2>

          <md-button class="md-icon-button">
            <router-link :to="{ path: '/users/' + $route.params.user_id + '/tasks/new' }" exact>
              <md-icon>add</md-icon>
              <md-tooltip md-direction="top">New task for {{user.firstname}} {{user.lastname}}</md-tooltip>
            </router-link>
          </md-button>

          <md-button class="md-icon-button">
            <router-link :to="'/user/'+ $route.params.user_id +'/tasks'"><md-icon>view_list</md-icon></router-link>
            <md-tooltip md-direction="top">View task</md-tooltip>
          </md-button>

          <md-button class="md-icon-button" @click.native="displayDetails($route.params.user_id)">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Edit User</md-tooltip>
          </md-button>

          <md-button class="md-icon-button" @click.native="openDialog('dialog5')">
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="top">Delete User</md-tooltip>
          </md-button>

          <md-dialog-confirm
            :md-title="confirm.title"
            :md-content-html="confirm.contentHtml"
            :md-ok-text="confirm.ok"
            :md-cancel-text="confirm.cancel"
            @open="onOpen"
            @close="onClose"
            ref="dialog5">
          </md-dialog-confirm>
          <md-dialog-alert
            :md-title="alert.title"
            :md-content="alert.content"
            :md-ok-text="alert.ok"
            @open="onOpen"
            @close="onClose"
            ref="dialog3">
          </md-dialog-alert>
        </md-toolbar>
        <md-card-content>
          <md-list class="custom-list md-triple-line">
            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/1" alt="People">
              </md-avatar>
              <div class="md-list-text-container">
                <span>Fullname: {{user.firstname}} {{user.lastname}}</span>
                <p>Title: {{user.title}}</p>
                <span>
                  Email: {{user.email}}
                </span>
                <span>
                  Admin: {{user.admin}}
                </span>
              </div>

            </md-list-item>
          </md-list>
        </md-card-content>
      </md-card>
    </md-layout>
    <md-layout>
    </md-layout>
  </md-layout>
</template>
<script>
import axios from 'axios'
// const config = { headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdG5hbWUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlJvb3QiLCJ0aXRsZSI6IkRlZmF1bHQgVXNlciIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaGFzaGVkX3Bhc3N3b3JkIjpudWxsLCJhZG1pbiI6MSwiaWF0IjoxNDk4MTkwMDMwfQ.WXB6a-qMNpFJvTw0fdg56XsaoioEZSt25g4psajBQH8' } }
export default {
  data: () => ({
    user: [],
    errors: [],
    msg: 'info',
    confirm: {
      title: 'Bạn muốn xoá User này ?',
      contentHtml: 'User này sẽ xoá khỏi hệ thống, các tin liên quan cũng sẽ được xoá khỏi hệ thống.',
      ok: 'OK',
      cancel: 'Cancel'
    },
    alert: {
      title: 'successfully',
      content: 'User deleted successfully !',
      ok: 'OK!'
    }
  }),
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    onOpen () {
      console.log('Opened')
    },
    onClose (type) {
      if (type === 'ok') {
        this.deleteUser()
      }
    },
    displayDetails (id) {
      this.$router.push({
        name: 'edit-user',
        params: { id: this.$route.params.user_id }
      })
    },
    deleteUser () {
      // axios.delete('https://ryukyu-social.cleverword.com/users_service/api/users/' + this.$route.params.user_id, config)
      // .then(response => {
      this.parent('main').remove()
      this.$refs['dialog3'].open()
      // })
      // .catch(e => {
      //   this.errors.push(e)
      // })
    }
  },
  created () {
    axios.get('https://ryukyu-social.cleverword.com/users_service/api/users/' + this.$route.params.user_id)
    .then(response => {
      this.user = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
<style scoped>
  .md-icon-button a,.md-icon-button a:hover{
    color: #ffffff;
  }
</style>
