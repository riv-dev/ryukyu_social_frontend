import Vue from 'vue'
import Router from 'vue-router'
import list from '@/list'
import home from '@/home'
import edit from '@/edit'
import show from '@/show'
import addnew from '@/new'
import edituser from '@/components/edit-user'
import editproject from '@/components/edit-project'
Vue.use(Router)
const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/user/:user_id',
    name: 'user',
    component: list
  },
  {
    path: '/user/:id/tasks',
    name: 'user-tasks',
    component: list
  },
  {
    path: '/user/:user_id/edit',
    name: 'edituser',
    component: edituser
  },
  {
    path: '/project/:project_id',
    name: 'project',
    component: list
  },
  {
    path: '/project/:project_id/tasks',
    name: 'project-task',
    component: list
  },
  {
    path: '/project/:project_id/edit',
    name: 'editproject',
    component: editproject
  },
  {
    path: '/edit/:task_id/task',
    name: 'edit',
    component: edit
  },
  {
    path: '/show/tasks/:task_id',
    component: show
  },
  {
    path: '/new/user',
    component: addnew
  }
]

export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active'
})
