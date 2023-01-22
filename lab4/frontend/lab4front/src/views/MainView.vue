<script lang="ts" setup>
import MainForm from "../components/MainForm.vue"
import Graphic from "../components/Graphic.vue"
import LastResult from "../components/LastResult.vue"
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

</script>

<template>
    

    <div class="w-full">
        <div id="graph-div">
            <Graphic class="mb-8" />
            <div class="text-center mb-8">
                <h1>Последний запрос</h1>
            </div>
            <div class="w-full mb-8">
                <LastResult />
            </div>
        </div>
        <div id="main-div">
            <MainForm />
        </div>
    </div>
    
    
</template>