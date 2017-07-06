<template>
  <main>
    <md-layout :md-gutter="16">
      <userlist></userlist>
      <projectlist></projectlist>
    </md-layout>
  </main>
</template>
<script>
  import userlist from '@/components/user-list'
  import projectlist from '@/components/project-list'
  export default {
    components: {
      userlist,
      projectlist
    }
  }
</script>
