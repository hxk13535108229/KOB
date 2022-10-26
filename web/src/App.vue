<!--
 * @Date: 2022-10-25 20:12:57
 * @LastEditors: hxk
 * @LastEditTime: 2022-10-26 14:07:56
 * @FilePath: \web\src\App.vue
-->
<template>
<NavBar />
  <router-view></router-view>
</template>


<script>
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

export default {
 components:{
  NavBar
 }
}
</script>>

<style>

body{
  background-image: url("./assets/images/background.png");
  background-size: cover;
}
</style>
