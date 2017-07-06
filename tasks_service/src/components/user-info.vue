<template>
  <div id="user" v-if="$route.params.user_id">
    <md-card>
      <md-toolbar class="md-dense">
        <h2 class="md-title" style="flex: 1">{{user.firstname}} {{ msg }}</h2>

        <md-button class="md-icon-button">
          <md-icon>add</md-icon>
          <md-tooltip md-direction="top">New task</md-tooltip>
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

      </md-toolbar>
      <md-card-content>
        <md-list class="custom-list md-triple-line">
          <md-list-item>
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/1" alt="People">
            </md-avatar>
            <div class="md-list-text-container">
              <span>Fullname: {{user.firstname}} {{user.lastname}}</span>
              <p>Position: {{user.title}}</p>
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

  </div>
  <div v-else>
  </div>
</template>
<script>
import axios from 'axios'
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
      console.log('Closed', type)
    },
    displayDetails (id) {
      this.$router.push({
        name: 'edituser',
        params: { id: this.$route.params.user_id }
      })
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
