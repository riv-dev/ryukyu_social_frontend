<template>
  <md-table-card>
    <md-toolbar>
      <h1 class="md-title">{{ project.name }} {{ msg }}</h1>
      <md-button class="md-icon-button md-raised md-primary" @click.native="displayDetails($route.params.user_id)">
        <md-icon>edit</md-icon>
        <md-tooltip md-direction="top">Edit project</md-tooltip>
      </md-button>
      <md-button class="md-icon-button md-raised md-primary">
        <md-icon>add</md-icon>
        <md-tooltip md-direction="top">New task</md-tooltip>
      </md-button>
      <md-button class="md-icon-button md-raised md-primary">
        <md-icon>view_list</md-icon>
        <md-tooltip md-direction="top">Vew task</md-tooltip>
      </md-button>
      <md-button class="md-icon-button md-raised md-primary" @click.native="openDialog('dialog5')">
        <md-icon>delete</md-icon>
        <md-tooltip md-direction="top">Delete project</md-tooltip>
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
          <md-table-head>Project ID</md-table-head>
          <md-table-head>Project Name</md-table-head>
          <md-table-head>Description</md-table-head>
          <md-table-head>Value</md-table-head>
          <md-table-head>Effort</md-table-head>
          <md-table-head>Status</md-table-head>
          <md-table-head>Deadline</md-table-head>
          <md-table-head>Start date</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body v-if="$route.params.project_id">
        <md-table-row>
          <md-table-cell>{{project.id}}</md-table-cell>
          <md-table-cell>{{project.name}}</md-table-cell>
          <md-table-cell>{{project.description}}</md-table-cell>
          <md-table-cell>{{project.value}}</md-table-cell>
          <md-table-cell>{{project.effort}}</md-table-cell>
          <md-table-cell>{{project.status}}</md-table-cell>
          <md-table-cell>{{project.deadline}}</md-table-cell>
          <md-table-cell>{{project.start_date}}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </md-table-card>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    project: [],
    errors: [],
    msg: 'Project Information',
    confirm: {
      title: 'Bạn muốn xoá Project này ?',
      contentHtml: 'Project này sẽ xoá khỏi hệ thống, các tin liên quan cũng sẽ được xoá khỏi hệ thống.',
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
        name: 'editproject',
        params: { id: this.$route.params.project_id }
      })
    }
  },
  created () {
    axios.get('https://ryukyu-social.cleverword.com/projects_service/api/projects/' + this.$route.params.project_id)
    .then(response => {
      // JSON responses are automatically parsed.
      this.project = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
<style scoped>
</style>
