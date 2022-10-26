<!--
 * @Date: 2022-10-26 14:26:10
 * @LastEditors: hxk
 * @LastEditTime: 2022-10-26 14:59:53
 * @FilePath: \web\src\components\PlayGround.vue
-->
<template>
    <div class="playground">
    <GameMap/>
    </div>
</template>

<script>
import GameMap from './GameMap.vue'

export default {
    components:{
        GameMap
    }
}

</script>

<style scoped>
div.playground{
    width:60vw;
    height: 70vh;
    margin: 40px auto;
}
</style>