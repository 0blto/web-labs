<script lang="ts" setup>
import Main from "../components/Main.vue"
import { onMounted } from "vue";

function setup() {
    const graph = document.getElementById('graph-div'),
    main = document.getElementById('main-div')
    main?.classList.forEach(elem => {
        main.classList.remove(elem)
    })
    graph?.classList.forEach(elem => {
        graph.classList.remove(elem)
    })
    if(window.innerWidth < 800){
        graph?.classList.add('m-auto')
        main?.classList.add('m-auto')
    } else {
        graph?.classList.add('float-left')
        graph?.classList.add('w-1/2')
        main?.classList.add('float-left')
        main?.classList.add('w-1/2')
    }
    main?.classList.add('mb-8')
    graph?.classList.add('mb-8')
}

onMounted(setup)
window.addEventListener('resize', setup)
window.addEventListener('reset', setup)

</script>

<template>
    <Main></Main>
</template>