<template>
  <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="50">
    <md-card v-if="projects && projects.length">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ msg }}</div>
          <div class="md-subhead">All projects</div>
        </md-card-header-text>
        <md-button class="md-icon-button md-raised md-primary">
          <router-link :to="{ path: '/new/project/' }" exact>
            <md-icon>add</md-icon>
          </router-link>
        </md-button>
      </md-card-header>
      <md-card-content v-for="project of projects" :key="project.id">
        <md-list class="custom-list md-triple-line">
          <md-list-item>
            <div class="md-list-text-container">
              <span>{{ project.name }}</span>
              <p>{{ project.description }}</p>
            </div>
            <md-button>
              <router-link :to="'/project/'+ project.id">Show Project</router-link>
            </md-button>
            <md-button>
              <router-link :to="'/project/'+ project.id +'/tasks'">View tasks</router-link>
            </md-button>
            <md-divider class="md-inset md-inset-project"></md-divider>
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
    projects: [],
    errors: [],
    msg: 'Projects list'
  }),
  created () {
    axios.get('https://ryukyu-social.cleverword.com/projects_service/api/projects')
    .then(response => {
      this.projects = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
<style scoped>
.md-inset-project{
  margin-left: 0px;
}
</style>
