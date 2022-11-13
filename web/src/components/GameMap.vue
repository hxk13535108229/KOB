<!--
 * @Date: 2022-10-26 14:31:11
 * @LastEditors: hxk
 * @LastEditTime: 2022-11-13 17:47:47
 * @FilePath: \web\src\components\GameMap.vue
-->
<template>
<div ref="parent" class="gamemap">
    <canvas ref="canvas" tabindex="0"></canvas>
</div>
</template>

<script>
import {GameMap} from "../assets/scripts/GameMap"
import {onMounted, ref} from 'vue'

export default {
    setup() {
        let parent = ref(null);
        let canvas = ref (null);

        onMounted(()=>{
            new GameMap(canvas.value.getContext('2d'), parent.value)
        });
        
        return {
            parent,
            canvas
        }
    }
}

</script>

<style scoped>
div.gamemap{
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>