<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
const store = useAuthStore();
const token = store.token;
let data = ref(new Array())
onMounted(async () => {
  const response = await fetch('http://localhost:5100/api/points', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  data.value = await response.json();
});
</script>

<template>
        <div class="relative max-w-6xl m-auto p-8 rounded-lg border-white border-solid border-2" style="height: 70vh">
          <div class="w-full h-full absolute top-0 left-0 overflow-y-auto rounded-lg">
            <table class="text-center border-collapse w-full rounded-lg">
                <thead>
                  <tr>
                      <th class="p-3 sticky top-0 bg-gray-800">X</th>
                      <th class="p-3 sticky top-0 bg-gray-800">Y</th>
                      <th class="p-3 sticky top-0 bg-gray-800">R</th>
                      <th class="p-3 sticky top-0 bg-gray-800">Результат</th>
                      <th class="p-3 sticky top-0 bg-gray-800">Текущее время</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(row) in data">
                    <td class="p-3">{{row.x}}</td>
                    <td class="p-3">{{row.y}}</td>
                    <td class="p-3">{{row.r}}</td>
                    <td class="p-3">{{ row.result }}</td>
                    <td class="p-3">{{ row.time }}</td>
                  </tr>
              </tbody>
          </table>
          </div>
        </div>
</template>

