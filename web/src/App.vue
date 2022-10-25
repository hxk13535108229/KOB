<!--
 * @Date: 2022-10-25 20:12:57
 * @LastEditors: hxk
 * @LastEditTime: 2022-10-25 20:52:36
 * @FilePath: \web\src\App.vue
-->
<template>
<div>
  <div>Bot昵称:{{bot_name}}</div>
  <div>Bot战力:{{bot_ranking}}</div>
</div>
  <router-view></router-view>
</template>


<script>
import $ from 'jquery';
import { ref } from 'vue';
export default {
  name:"APP",
  setup:()=>{
    let bot_name = ref("");
    let bot_ranking = ref("");

$.ajax({
  url:"http://127.0.0.1:3000/pk/getBotInfo/",
  type:"get",
  success:resp =>{
    console.log(resp);
    bot_name.value=resp.name,
    bot_ranking.value=resp.ranking
  }
})

    return {
      bot_name,
      bot_ranking
    }
  }
}
</script>>

<style>
body{
  background-image: url("./assets/background.png");
  background-size: cover;
}
</style>
