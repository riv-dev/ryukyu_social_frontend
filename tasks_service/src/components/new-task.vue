<template>
  <md-layout md-gutter v-if="$route.params.task_id">
    <md-layout>
    </md-layout>
    <md-layout>
      <md-card>
        <md-toolbar class="md-dense">
          <div class="md-title">{{tasks.name}} {{ msg }}</div>
        </md-toolbar>
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
            <button type="submit" class="md-raised md-primary">Update</button>
          </form>
        </md-card-content>
      </md-card>
    </md-layout>
    <md-layout>
    </md-layout>
  </md-layout>
  <div v-else>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    tasks: [],
    errors: [],
    msg: ' Info'
  }),
  // Fetches tasks when the component is created.
  created () {
    axios.get('https://ryukyu-social.cleverword.com/tasks_service/api/tasks/' + this.$route.params.task_id)
    .then(response => {
      this.tasks = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {

  }
}
</script>
<style scoped>
</style>
