<template>
  <md-layout md-gutter>
    <md-layout>
    </md-layout>
    <md-layout>
      {{this.$route.params.project_id}}
      <md-card>
        <md-card-header>
          <div class="md-title">{{projects.name}} Project</div>
          <div class="md-subhead">{{ msg }} to {{projects.name}} Project</div>
        </md-card-header>
        <md-card-content>
          <form>
            <md-input-container>
              <label>Name</label>
              <md-input v-model="newtask.name"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Description</label>
              <md-textarea v-model="newtask.description"></md-textarea>
            </md-input-container>
            <md-input-container>
              <label>Priority</label>
              <md-input v-model="newtask.priority" type="number"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Status</label>
              <md-input v-model="newtask.status"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Deadline</label>
              <md-input v-model="newtask.deadline"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Project ID</label>
              <md-input v-model="this.$route.params.project_id" disabled></md-input>
            </md-input-container>
            <md-input-container>
              <label>Creator user ID</label>
              <md-input v-model="newtask.creator_user_id" type="number"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Parent task ID</label>
              <md-input v-model="newtask.parent_task_id" type="number"></md-input>
            </md-input-container>
            <md-card-actions>
              <md-button class="md-raised md-primary" @click.native="$router.push({ name: 'project-tasks' })">back</md-button>
              <button  class="md-button md-raised md-primary md-theme-default" type="submit" name="button" v-on:click.prevent="addNewTasktoProject">ADD NEW TASK</button>
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
    <md-layout>
    </md-layout>
  </md-layout>
</template>
<script>
import axios from 'axios'
/* eslint-disable no-new */
const config = { headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdG5hbWUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlJvb3QiLCJ0aXRsZSI6IkRlZmF1bHQgVXNlciIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaGFzaGVkX3Bhc3N3b3JkIjpudWxsLCJhZG1pbiI6MSwiaWF0IjoxNDk4MTkwMDMwfQ.WXB6a-qMNpFJvTw0fdg56XsaoioEZSt25g4psajBQH8' } }
export default {
  data: () => ({
    projects: [],
    errors: [],
    newtask: [],
    msg: 'Add new task',
    alert: {
      content: 'Your has been add new task!',
      ok: 'OK!'
    }
  }),
  created () {
    axios.get('https://ryukyu-social.cleverword.com/projects_service/api/projects/' + this.$route.params.project_id)
    .then(response => {
      this.projects = response.data
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
    addNewTasktoProject: function () {
      axios.post('https://ryukyu-social.cleverword.com/tasks_service/api/projects/' + this.$route.params.project_id + '/tasks/',
        {
          name: this.newtask.name,
          description: this.newtask.description,
          priority: this.newtask.priority,
          status: this.newtask.status,
          deadline: this.newtask.deadline,
          project_id: this.$route.params.project_id,
          parent_task_id: this.newtask.parent_task_id,
          creator_user_id: this.newtask.creator_user_id
        },
        config
      )
      .then(response => {
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
