<template>
  <main>
    <component :is="this.$route.name"></component>
  </main>
</template>
<script>
  export default {
    components: {
      'new-user': require('@/components/new-user'),
      'new-project': require('@/components/new-project'),
      'new-task': require('@/components/new-task'),
      'project-new-task': require('@/components/project-new-task'),
      'user-new-task': require('@/components/user-new-task')
    }
  }
</script>
