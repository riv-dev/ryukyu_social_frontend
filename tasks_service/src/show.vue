<template>
  <main>
    <component :is="this.$route.name"></component>
  </main>
</template>
<script>
  export default {
    components: {
      'assign-task': require('@/components/assign-task')
    }
  }
</script>
