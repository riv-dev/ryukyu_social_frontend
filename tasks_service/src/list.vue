<template>
  <main>
    <userinfo></userinfo>
    <usertasks></usertasks>
    <projectinfo></projectinfo>
    <projecttask></projecttask>
  </main>
</template>
<script>
  import userinfo from '@/components/user-info'
  import usertasks from '@/components/user-tasks'
  import projectinfo from '@/components/project-info'
  import projecttask from '@/components/project-task'
  export default {
    components: {
      userinfo,
      usertasks,
      projectinfo,
      projecttask
    }
  }
</script>
