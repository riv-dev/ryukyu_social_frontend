<template>
  <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="50">
    <md-card v-if="users && users.length">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ msg }}</div>
          <div class="md-subhead">All Users</div>
        </md-card-header-text>
        <md-button class="md-icon-button md-raised md-primary">
          <router-link :to="{ path: '/new/user/' }" exact>
            <md-icon>add</md-icon>
          </router-link>
        </md-button>
      </md-card-header>
      <md-card-content v-for="user of users" :key="user.id">
        <md-list class="custom-list md-triple-line">
          <md-list-item>
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/1" alt="People">
            </md-avatar>
            <div class="md-list-text-container">
              <span>{{user.firstname}} {{user.lastname}}</span>
              <p>{{user.title}}</p>
            </div>
            <md-button>
              <router-link :to="{ path: '/user/'+user.id }" exact activeClass>Show User</router-link>
            </md-button>
            <md-button>
              <router-link :to="'/user/'+ user.id +'/tasks'">View tasks</router-link>
            </md-button>
            <md-button class="md-icon-button" @click.native="openDialog('dialog')">
              <md-icon>delete</md-icon>
              <md-tooltip md-direction="top">Delete User</md-tooltip>
            </md-button>
            <md-divider class="md-inset"></md-divider>
          </md-list-item>
        </md-list>
      </md-card-content>
    </md-card>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors" :key="error">
        {{error.message}}
      </li>
    </ul>
  </md-layout>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    users: [],
    errors: [],
    msg: 'Users list'
  }),
  created () {
    axios.get('https://ryukyu-social.cleverword.com/users_service/api/users')
    .then(response => {
      this.users = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
<style scoped>
</style>
