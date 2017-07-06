<template>
  <md-layout :md-gutter="16" v-if="$route.params.id">
    <md-layout v-if="tasks && tasks.length">
      <md-table-card>
        <md-toolbar>
          <h1 class="md-title">{{ msg }} {{user.firstname}} {{user.lastname}}</h1>
          <md-button class="md-icon-button">
            <md-icon>add</md-icon>
            <md-tooltip md-direction="top">New task for {{user.firstname}}</md-tooltip>
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
              <md-table-head>Assigned to</md-table-head>
              <md-table-head>Deadline</md-table-head>
              <md-table-head>Project</md-table-head>
              <md-table-head>Progress Description</md-table-head>
              <md-table-head>Detail</md-table-head>
              <md-table-head>&nbsp;</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="task of tasks" :key="task.id">
              <md-table-cell>
                <span>{{user.firstname}} {{user.lastname}}</span>
              </md-table-cell>
              <md-table-cell>
                <span>{{task.deadline}}</span>
              </md-table-cell>
              <md-table-cell>
                <span>{{task.name}}</span>
              </md-table-cell>
              <md-table-cell>
                <span>{{task.progress_description}}</span>
              </md-table-cell>
              <md-table-cell>
                <router-link :to="'/show/tasks/'+ task.task_id">
                  Detail this task
                </router-link>
              </md-table-cell>
              <md-table-cell>
                <md-button class="md-icon-button">
                  <router-link :to="'/edit/'+ task.id +'/task'">
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
  <div v-else>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data: () => ({
    tasks: [],
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
      this.tasks = response.data
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
