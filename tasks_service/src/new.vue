<template>
  <main>
    <newuser></newuser>
    <newtask></newtask>
  </main>
</template>
<script>
  import newuser from '@/components/new-user'
  import newtask from '@/components/new-task'
  export default {
    components: {
      newuser,
      newtask
    }
  }
</script>
