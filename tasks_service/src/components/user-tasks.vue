<template>
  <md-layout :md-gutter="16">
    <md-layout v-if="usertasks && usertasks.length">
      <md-table-card>
        <md-toolbar>
          <h1 class="md-title">{{ msg }} {{user.firstname}} {{user.lastname}}</h1>
          <md-button class="md-icon-button md-raised md-primary">
            <router-link :to="{ path: '/user/' + $route.params.id }" exact>
              <md-icon>info</md-icon>
              <md-tooltip md-direction="top">Info {{user.firstname}} {{user.lastname}}</md-tooltip>
            </router-link>
          </md-button>
          <md-button class="md-icon-button md-raised md-primary">
            <router-link :to="{ path: '/users/' + $route.params.id + '/tasks/new' }" exact>
              <md-icon>add</md-icon>
              <md-tooltip md-direction="top">New task for {{user.firstname}}</md-tooltip>
            </router-link>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>filter_list</md-icon>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>
        </md-toolbar>
        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head>Task ID</md-table-head>
              <md-table-head>Task Name</md-table-head>
              <md-table-head>Description</md-table-head>
              <md-table-head>Priority</md-table-head>
              <md-table-head>Status</md-table-head>
              <md-table-head>Deadline</md-table-head>
              <md-table-head>Assign</md-table-head>
              <md-table-head>&nbsp;</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="task of usertasks" :key="task.id">
              <md-table-cell>
                <span>{{task.id}}</span>
              </md-table-cell>
              <md-table-cell>
                <span>{{task.name}}</span>
              </md-table-cell>
              <md-table-cell>
                <span>{{task.description}}</span>
              </md-table-cell>
              <md-table-cell>
                <span>{{task.priority}}</span>
              </md-table-cell>
              <md-table-cell>
                <span>{{task.status}}</span>
              </md-table-cell>
              <md-table-cell>
                <span>{{task.deadline}}</span>
              </md-table-cell>
              <md-table-cell>
                <router-link :to="'/tasks/'+ task.task_id">
                  <md-chip md-editable>Assign task</md-chip>
                </router-link>
              </md-table-cell>
              <md-table-cell>
                <md-button class="md-icon-button">
                  <router-link :to="'/edit/'+ task.task_id +'/task'">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="top">Edit Task</md-tooltip>
                  </router-link>
                </md-button>
                <md-button class="md-icon-button" @click.native="openDialog('dialog')">
                  <md-icon>delete</md-icon>
                  <md-tooltip md-direction="top">Delete Task</md-tooltip>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-table-card>
    </md-layout>
    <md-layout v-else>
      <md-table-card>
      <md-toolbar>
        Sorry, tasks not found !
      </md-toolbar>
      <md-table>
        <md-table-body>
          <md-table-row>
          <md-table-cell>
            <child message="^_^"></child>
          </md-table-cell>
          </md-table-row>
        </md-table-body>
        </md-table>
      </md-table-card>
    </md-layout>
    <md-dialog-confirm
      :md-title="confirm.title"
      :md-content-html="confirm.contentHtml"
      :md-ok-text="confirm.ok"
      :md-cancel-text="confirm.cancel"
      @open="onOpen"
      @close="onClose"
      ref="dialog">
    </md-dialog-confirm>
  </md-layout>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data: () => ({
    usertasks: [],
    errors: [],
    user: [],
    msg: 'Tasks',
    confirm: {
      title: 'Bạn muốn xoá task này ?',
      contentHtml: 'Task này sẽ bị xoá khỏi dự án này, bạn sẽ không thể khôi phục.',
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
    }
  },
  created () {
    axios.get('https://ryukyu-social.cleverword.com/tasks_service/api/users/' + this.$route.params.id + '/tasks')
    .then(response => {
      this.usertasks = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.get('https://ryukyu-social.cleverword.com/users_service/api/users/' + this.$route.params.id)
    .then(response => {
      this.user = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}

Vue.component('child', {
  props: ['message'],
  template: '<span>{{ message }}</span>'
})

</script>
<style scoped>
</style>
