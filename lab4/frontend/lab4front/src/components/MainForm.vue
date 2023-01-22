<script lang="ts" setup>
import { usePointStore } from '@/stores/point';
import { reactive } from 'vue';


function validateX(x: string) {
    if (parseFloat(x)) {
        let new_ = parseFloat(x)
        if (new_ > 3 || new_ < -3) {
            return false
        }
        return true
    } 
    msg('Incorrect x')
    return false
}

function validateY(y: string) {
    if (parseFloat(y)) {
        let new_ = parseFloat(y)
        if (new_ > 5 || new_ < -5) {
            return false
        }
        return true
    } 
    msg('Incorrect y')
    return false
}

function validateR(r: string) {
    if (parseFloat(r)) {
        let new_ = parseFloat(r)
        if (new_ > 3 || new_ < 1) {
            return false
        }
        return true
    } 
    msg('Incorrect r')
    return false
}

function validateData(x: string, y: string, r: string) {
    return validateX(x) && validateY(y) && validateR(r);
}

const coords = reactive({
    x: '',
    y: '',
    r: ''
})

function onSubmit() {
    if (validateData(coords.x, coords.y, coords.r)) {
      usePointStore().requestForm(coords.x, coords.y, coords.r)
    }
}
</script>

<template>
    <form class="bg-white p-4 rounded-md shadow-md max-w-sm m-auto" @submit.prevent="onSubmit">
      <div class="mb-4">
        <label for="x" class="block text-gray-700 text-sm font-bold mb-2">Значение X</label>
        <input type="text" id="x" placeholder="(-3 .. 3)" v-model="coords.x"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-4">
        <label for="y" class="block text-gray-700 text-sm font-bold mb-2">Значение Y</label>
        <input type="text" id="y" placeholder="(-5 .. 5)" v-model="coords.y"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-6">
        <label for="r" class="block text-gray-700 text-sm font-bold mb-2">Значение R</label>
        <input type="text" id="r" placeholder="(1 .. 3)" v-model="coords.r"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="flex items mb-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Проверить
        </button>
      </div>
    </form>
  </template>