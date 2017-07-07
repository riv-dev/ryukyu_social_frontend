<template>
  <main>
    <component :is="this.$route.name"></component>
  </main>
</template>
<script>
  export default {
    components: {
      'edit-user': require('@/components/edit-user'),
      'edit-project': require('@/components/edit-project'),
      'edit-task': require('@/components/edit-task')
    }
  }
</script>
