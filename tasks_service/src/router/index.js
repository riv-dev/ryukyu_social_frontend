import Vue from 'vue'
import Router from 'vue-router'
import list from '@/list'
import home from '@/home'
import edit from '@/edit'
import show from '@/show'
import addnew from '@/new'
Vue.use(Router)
const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/user/:user_id',
    name: 'user-info',
    component: list
  },
  {
    path: '/user/:id/tasks',
    name: 'user-tasks',
    component: list
  },
  {
    path: '/edit/:user_id/user',
    name: 'edit-user',
    component: edit
  },
  {
    path: '/project/:project_id',
    name: 'project-info',
    component: list
  },
  {
    path: '/project/:project_id/tasks',
    name: 'project-tasks',
    component: list
  },
  {
    path: '/edit/:project_id/project',
    name: 'edit-project',
    component: edit
  },
  {
    path: '/new/project',
    name: 'new-project',
    component: addnew
  },
  {
    path: '/edit/:task_id/task',
    name: 'edit-task',
    component: edit
  },
  {
    path: '/tasks/:task_id',
    name: 'assign-task',
    component: show
  },
  {
    path: '/new/user',
    name: 'new-user',
    component: addnew
  }
]

export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active'
})
