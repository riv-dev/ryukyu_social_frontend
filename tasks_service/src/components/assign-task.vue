<template>
  <md-layout md-gutter>
    <md-card>
      <md-card-header>
        <div class="md-title">{{tasks.name}} - Assign</div>
        <div class="md-subhead">{{ msg }}</div>
      </md-card-header>
      <md-card-content>
        <form>
          <md-input-container>
            <label>Name</label>
            <md-input v-model="tasks.name" disabled></md-input>
          </md-input-container>
          <md-input-container>
            <label>Description</label>
            <md-input v-model="tasks.description" disabled></md-input>
          </md-input-container>
          <md-input-container>
            <label>Priority</label>
            <md-input v-model="tasks.priority" disabled></md-input>
          </md-input-container>
          <md-input-container>
            <label>Status</label>
            <md-input v-model="tasks.status" disabled></md-input>
          </md-input-container>
          <md-input-container>
            <label>Deadline</label>
            <md-input v-model="tasks.deadline" disabled></md-input>
          </md-input-container>
          <md-input-container>
            <label>Project ID</label>
            <md-input v-model="tasks.project_id" disabled></md-input>
          </md-input-container>
          <md-input-container>
            <label>Creator user ID</label>
            <md-input v-model="tasks.creator_user_id" disabled></md-input>
          </md-input-container>
          <md-input-container>
            <label>Parent task ID</label>
            <md-input v-model="tasks.parent_task_id" disabled></md-input>
          </md-input-container>

          <div class="md-card-assign">
            <h2 class="md-title">Assigned Persons</h2>

            <md-card-header v-for="(usertask, index) in usertasks" :key="index">

              <md-card-header-text v-for="(user, index) in users" :key="index" v-if="usertask.user_id==user.id">
                <div class="md-title">{{user.firstname}} {{user.lastname}}</div>
              </md-card-header-text>
              <md-card-actions>
                <md-button>View Progress Description</md-button>
                <md-button class="md-primary">Edit Progress Description</md-button>
                <md-button class="md-accent">Remove Person from Task</md-button>
              </md-card-actions>
            </md-card-header>

            <h2 class="md-title">Assign New Persons</h2>
            <div class="field-group">
              <md-input-container>
                <label for="userlist">Select user</label>
                <md-select name="userlist" id="userlist" v-model="userlist">
                  <md-option :value="user.id" v-for="user of users" :key="user.id">{{user.firstname}} {{user.lastname}}</md-option>
                </md-select>
              </md-input-container>
            </div>
          </div>

          <md-card-actions>
            <md-button class="md-raised md-primary" @click.native="$router.push({ name: 'user-tasks' })">back</md-button>
            <button class="md-button md-raised md-primary md-theme-default" type="submit" name="button" v-on:click.prevent="assignTasktoUser">Assign</button>
          </md-card-actions>

        </form>
        <md-dialog-alert
          :md-content="alert.content"
          :md-ok-text="alert.ok"
          ref="dialog3">
        </md-dialog-alert>
      </md-card-content>
    </md-card>
  </md-layout>
</template>
<script>
import axios from 'axios'
/* eslint-disable no-new */
const config = { headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdG5hbWUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlJvb3QiLCJ0aXRsZSI6IkRlZmF1bHQgVXNlciIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaGFzaGVkX3Bhc3N3b3JkIjpudWxsLCJhZG1pbiI6MSwiaWF0IjoxNDk4MTkwMDMwfQ.WXB6a-qMNpFJvTw0fdg56XsaoioEZSt25g4psajBQH8' } }
export default {
  data: () => ({
    tasks: [],
    usertasks: [],
    users: [],
    errors: [],
    userlist: '',
    msg: 'Assign Infomation',
    alert: {
      content: 'Your has been assigned task!',
      ok: 'OK!'
    }
  }),
  created () {
    axios.get('https://ryukyu-social.cleverword.com/tasks_service/api/tasks/' + this.$route.params.task_id)
    .then(response => {
      this.tasks = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.get('https://ryukyu-social.cleverword.com/tasks_service/api/tasks/' + this.$route.params.task_id + '/users')
    .then(response => {
      this.usertasks = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.get('https://ryukyu-social.cleverword.com/users_service/api/users')
    .then(response => {
      this.users = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  computed: {
    isDisabled () {
      return true
    }
  },
  methods: {
    assignTasktoUser: function () {
      axios.post('https://ryukyu-social.cleverword.com/tasks_service/api/tasks/' + this.$route.params.task_id + '/users/' + this.userlist,
        {
          user_id: this.userlist,
          progress_description: this.usertasks.progress_description
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
.md-button {
  margin: 15px 0px;
}

.md-card-assign .md-title {
  font-size: 14px;
}

.md-card-assign .md-card-header .md-title {
  text-transform: uppercase;
}

.md-card-assign .md-card-header {
  padding-left: 0px;
  padding-right: 0px;
  border-bottom: solid 1px rgba(0,0,0,.12);
}
.md-card-assign .md-card-actions{
  padding: 0px;
}
</style>
