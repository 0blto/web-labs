<script lang="ts" setup>
import { reactive } from 'vue';
import { usePointStore } from '@/stores/point';


    const last = reactive({
        x: localStorage.getItem('lastResp') ?
             JSON.parse(localStorage.getItem('lastResp')!).x :
              '-',
              y: localStorage.getItem('lastResp') ?
             JSON.parse(localStorage.getItem('lastResp')!).y :
              '-',
              r: localStorage.getItem('lastResp') ?
             JSON.parse(localStorage.getItem('lastResp')!).r :
              '-',
              time: localStorage.getItem('lastResp') ?
             JSON.parse(localStorage.getItem('lastResp')!).time :
              '-',
              res: localStorage.getItem('lastResp') ?
             JSON.parse(localStorage.getItem('lastResp')!).answer :
              '-'
    })
</script>

<template>
    <table class="w-full text-center border-collapse" style="border: 3px solid black; border-radius: 10%;">
        <thead class="bg-gray-500">
            <tr>
                <th class="p-3">X</th>
                <th class="p-3">Y</th>
                <th class="p-3">R</th>
                <th class="p-3">Результат</th>
                <th class="p-3">Текущее время</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="p-3">{{usePointStore().x}}</td>
                <td class="p-3">{{ usePointStore().y }}</td>
                <td class="p-3">{{ usePointStore().r }}</td>
                <td class="p-3">{{ usePointStore().res }}</td>
                <td class="p-3">{{ usePointStore().time }}</td>
            </tr>
        </tbody>
    </table>
</template>