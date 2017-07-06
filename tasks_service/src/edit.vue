<template>
  <main>
    <editTask></editTask>
  </main>
</template>
<script>
  import editTask from '@/components/edit-task'
  import Modal from 'modal-vue'
  export default {
    name: 'edit',
    components: {
      editTask,
      Modal
    }
  }
</script>
