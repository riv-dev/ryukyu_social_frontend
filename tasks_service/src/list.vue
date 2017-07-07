<template>
  <main>
    <component :is="this.$route.name"></component>
  </main>
</template>
<script>
  export default {
    components: {
      'user-info': require('@/components/user-info'),
      'project-info': require('@/components/project-info'),
      'user-tasks': require('@/components/user-tasks'),
      'project-tasks': require('@/components/project-tasks')
    }
  }
</script>
