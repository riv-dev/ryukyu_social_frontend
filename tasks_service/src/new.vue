<template>
  <main>
    <newuser></newuser>
    <newtask></newtask>
    <newproject></newproject>
  </main>
</template>
<script>
  import newuser from '@/components/new-user'
  import newtask from '@/components/new-task'
  import newproject from '@/components/new-project'
  export default {
    components: {
      newuser,
      newtask,
      newproject
    }
  }
</script>
