<template>
  <md-layout md-gutter v-if="$route.params.task_id">
    <md-layout>
    </md-layout>
    <md-layout>
      <md-card>
        <md-card-header>
          <div class="md-title">{{tasks.name}}</div>
          <div class="md-subhead">{{ msg }}</div>
        </md-card-header>
        <md-card-content>
          <form method="post" v-on:submit.prevent="updateTask">
            <md-input-container>
              <label>Name</label>
              <md-input v-model="tasks.name"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Description</label>
              <md-input v-model="tasks.description"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Priority</label>
              <md-input v-model="tasks.priority"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Status</label>
              <md-input v-model="tasks.status"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Deadline</label>
              <md-input v-model="tasks.deadline"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Project ID</label>
              <md-input v-model="tasks.project_id"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Creator user ID</label>
              <md-input v-model="tasks.creator_user_id"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Parent task ID</label>
              <md-input v-model="tasks.parent_task_id"></md-input>
            </md-input-container>

            <div class="md-card-assign">
              <h2 class="md-title">Assigned Persons</h2>

              <md-card-header v-for="usertask in usertasks" :key="usertask.user_id">
                <md-card-header-text>
                  <div class="md-title" :text="getInfo(usertask.user_id)">
                  </div>
                </md-card-header-text>
                <md-card-actions>
                  <md-button>View Progress Description</md-button>
                  <md-button>Edit Progress Description</md-button>
                  <md-button>Remove Person from Task</md-button>
                </md-card-actions>
              </md-card-header>

              <h2 class="md-title">Assign New Persons</h2>
              <md-input-container>
                <label for="userlist">Select user</label>
                <md-select name="userlist" id="userlist">
                  <md-option value="" v-for="user of users" :key="user.id">{{user.firstname}} {{user.lastname}}</md-option>
                </md-select>
              </md-input-container>

            </div>

            <md-card-actions>
              <md-button class="md-raised md-primary" @click.native="$router.push({ name: 'user-tasks' })">back</md-button>
              <md-button class="md-raised md-primary">Assign</md-button>
            </md-card-actions>

          </form>
        </md-card-content>
      </md-card>
      {{tasks}}
      <br>
      <br> {{usertasks}}
      <br>
      <br>
      {{JSON.stringify(users)}}

      <br>

    </md-layout>
    <md-layout>
    </md-layout>
  </md-layout>

  <div v-else>
  </div>
</template>
<template>
  <my-component inline-template>
    <ul id="users-list">
      <li v-for="user in users">{{user}} <span :text="fullName(user.id)">Lastname:{{last}}</span></li>
      <li><span :text="fullName(8)">Lastname:{{last}}</span></li>
    </ul>
  </my-component>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
/* eslint-disable no-new */
export default {

  data: () => ({
    tasks: [],
    usertasks: [],
    users: [],
    errors: [],
    msg: ' Info'
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
    this.getInfo()
  },
  methods: {
    getInfo: function (id) {
      axios.get('https://ryukyu-social.cleverword.com/users_service/api/users/' + id)
      .then((response) => {
        this.namename = response.data.lastname
        console.log(response.data)
        return this.namename
      })
    }
  }
}

Vue.component('my-component', {
  template: '#users-list',
  data: function () {
    return {
      users: []
    }
  },
  mounted: function () {
    axios.get('https://ryukyu-social.cleverword.com/users_service/api/users/').then((response) => {
      console.log(response.body)
      this.users = response.data
    })
  },
  methods: {
    fullName: function (salut) {
      console.log(salut)
      axios.get('https://ryukyu-social.cleverword.com/users_service/api/users/' + salut)
      .then((response) => {
        this.last = response.data.lastname
        console.log(salut)
        return this.last
      })
    }
  }
})

</script>
<style scoped>
.md-button {
  margin: 15px 0px;
}

.md-card-assign .md-title {
  font-size: 16px;
}

.md-card-assign .md-card .md-card-header {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
