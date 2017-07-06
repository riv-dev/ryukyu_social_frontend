<template>
  <div id="app">
    <router-header></router-header>
    <router-view></router-view>
    <router-footer></router-footer>
  </div>
</template>

<script>
  import header from '@/header'
  import footer from '@/footer'
  export default {
    components: {
      'router-header': header,
      'router-footer': footer
    }
  }
</script>

<style>
main{
  padding: 16px;
}
.md-table-head{
  text-transform: uppercase;
}
#app main .md-icon{
  margin: auto;
}
.md-title a,.md-title a:hover{
  color:#ffffff !important;
  text-decoration:none !important;
}
.md-card{
  width: 100%;
}
.footer{
  margin-bottom:25px;
}
a:hover{
  text-decoration:none !important;
}
.md-button a .md-icon,.md-button a:hover .md-icon{
  color: #ffffff;
}
</style>
