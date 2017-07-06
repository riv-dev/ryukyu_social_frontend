<template>
  <md-table-card>
    <md-toolbar>
      <h1 class="md-title">{{ msg }}</h1>
      <md-button class="md-icon-button md-raised md-primary">
        <md-icon>add</md-icon>
        <md-tooltip md-direction="top">New task</md-tooltip>
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
          <md-table-head>priority</md-table-head>
          <md-table-head>Status</md-table-head>
          <md-table-head>Deadline</md-table-head>
          <md-table-head>Project ID</md-table-head>
          <md-table-head>Creator user ID</md-table-head>
          <md-table-head>Parent task ID</md-table-head>
          <md-table-head></md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body v-if="$route.params.project_id">
        <md-table-row v-for="tasks in projects" :key="tasks.id">
          <md-table-cell v-for="(task, index) in tasks" :key="index">{{task}}</md-table-cell>
          <md-table-cell>
            <md-button class="md-icon-button">
              <router-link :to="'/edit/'+ tasks.id +'/task'">
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
    <md-dialog-confirm
      :md-title="confirm.title"
      :md-content-html="confirm.contentHtml"
      :md-ok-text="confirm.ok"
      :md-cancel-text="confirm.cancel"
      @open="onOpen"
      @close="onClose"
      ref="dialog">
    </md-dialog-confirm>
  </md-table-card>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    projects: [],
    errors: [],
    msg: 'Project tasks',
    confirm: {
      title: 'Bạn muốn xoá task này ?',
      contentHtml: 'Task này sẽ bị xoá khỏi dự án này, bạn sẽ không thể khôi phục.',
      ok: 'OK',
      cancel: 'Cancel'
    }
  }),
  // Fetches projects when the component is created.
  created () {
    axios.get('https://ryukyu-social.cleverword.com/tasks_service/api/projects/' + this.$route.params.project_id + '/tasks')
    .then(response => {
      // JSON responses are automatically parsed.
      this.projects = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
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
  }
}

</script>
<style scoped>
</style>
