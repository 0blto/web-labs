<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { usePointStore } from '@/stores/point';
import { onMounted } from 'vue';
import { reactive, ref } from 'vue';
import Swal from 'sweetalert2';

function msg(msg: string) {
  Swal.fire({
    icon: 'error',
    title: 'Ошибка',
    text: msg
  })
}


let canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D
let size = 300,
default_line_width = 3,
def = 15,
default_margin = 10

function params() {
    try {
        size = 200
        if (window.innerWidth > 400) {
            size = 350
        } else if (window.innerWidth > 500) {
            size = 500
        }
        canv.height = size
        canv.width = size
    } catch(e) {
        //it's ok
    }
}

function rect(color: string, fromX: number, fromY: number, lenX: number, lenY: number) {
    try {
        ctx.fillStyle = color
        ctx.fillRect(fromX, fromY, lenX, lenY)
    } catch(e) {
        //it's ok
    }
}

function line(color: string, fromX: number, fromY: number, length: number, width: number, angle: number) {
    try {
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(length * Math.sin(angle) + size / 2, -length * Math.cos(angle) + size / 2)
        ctx.stroke()
        ctx.closePath()
    } catch(e) {
        //it's ok
    }
}

async function graphic() {
    try {
        canv = document.querySelector('canvas') as HTMLCanvasElement
        ctx = canv?.getContext('2d') as CanvasRenderingContext2D
        params()
        rect('#1a202c', 0, 0, size, size)
        line('#a0aec0', 0, size / 2, size, default_line_width, Math.PI / 2)
        line('#a0aec0', size / 2, 0, size, default_line_width, Math.PI)
        ctx.strokeStyle = '#a0aec0'
        ctx.beginPath()
        ctx?.moveTo(size, size / 2)
        ctx?.lineTo(size - def, size / 2 - def)
        ctx?.moveTo(size, size / 2)
        ctx?.lineTo(size- def, size / 2 + def)
        ctx?.moveTo(size / 2, 0)
        ctx?.lineTo(size / 2 - def, def)
        ctx?.moveTo(size / 2, 0)
        ctx?.lineTo(size / 2 + def, def)
        ctx.moveTo(size / 4, 1 / 2 * size)
        ctx.lineTo(1 / 2 * size, size * 3 / 8)
        ctx?.stroke()
        ctx?.closePath()

        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 8, 0, Math.PI / 2)

        
        ctx.moveTo(size / 2, size * 1 / 4)
        ctx.lineTo(size * 5 / 8, size * 1 / 4)
        ctx.moveTo(size * 5 / 8, size * 1 / 4)
        ctx.lineTo(size * 5 / 8, size / 2)
        ctx.stroke()
        ctx.closePath()

        let radius = 'R'
        let halfRadius = 'R/2'
        if (3 >= coords.r && coords.r >= 1) {
            radius = coords.r.toString()
            halfRadius = (coords.r / 2).toString()
        }
        ctx.font = `${size/25}px Arial`
        ctx.textAlign = 'right'
        ctx.fillStyle = 'white'
        ctx.textBaseline = 'top'

        ctx.fillText(`${halfRadius}`, size / 2 - default_margin, 3 / 8 * size)
        ctx.fillText(`${radius}`, size / 2 - default_margin, 1 / 4 * size)
        ctx.fillText(`-${radius}`, size / 2 - default_margin, size - 1 / 4 * size)
        ctx.fillText(`-${halfRadius}`, size / 2 - default_margin, size - 3 / 8 * size)
        ctx.fillText('Y', size / 2 - default_margin, default_margin * 3)

        ctx.fillText(`-${halfRadius}`, 3 / 8 * size, size / 2 + default_margin)
        ctx.fillText(`-${radius}`, 1 / 4 * size, size / 2 + default_margin)
        ctx.fillText(`${radius}`, 3/4 * size, size / 2 + default_margin)
        ctx.fillText(`${halfRadius}`, 5/8 * size, size / 2 + default_margin)
        ctx.fillText('X', size - 2 * default_margin, size / 2 + default_margin)

        
        if (3 >= coords.r && coords.r >= 1) {
            const response = await fetch('http://localhost:5100/api/points', {
                headers: {
                Authorization: `Bearer ${useAuthStore().token}`,
                },
            });
            const data = await response.json()
            
            data.forEach((element: { x: number; y: number; }) => {
                restoreCanvas(element.x, element.y, coords.r)
            });

        }
    } catch(e) {
        //it's ok
    }
}

    



function dot(x: number, y: number) {
    let xVal = -(size / 2 - x)
    let yVal = size / 2 - y

    if (xVal >= 0 && yVal >= 0 && yVal <= 1/4 * size && xVal <= 1/8 * size) {
        ctx.fillStyle = 'green';
    } else if (xVal <= 0 && yVal >= 0 && yVal <= xVal / 2 + 1 / 8 * size) {
        ctx.fillStyle = 'green';
    } else if (xVal >= 0 && yVal <= 0 && (xVal * xVal) + (yVal * yVal) <= (1/8/8 * size * size)) {
        ctx.fillStyle = 'green';
    } else {
        ctx.fillStyle = 'red';
    }
    ctx.beginPath()
    ctx.arc(x, y, default_margin / 4, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()

}

function canvas_get_dot(canv: HTMLCanvasElement, event: MouseEvent, radius: number) {
    const rect = canv.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    dot(x, y)
    return {
        x: ((x - size / 2) * radius / (1/4 * size)),
        y: ((size / 2 - y) * radius / (1/4 * size))
    }
}

function restoreCanvas(x: number, y: number, r: number) {
    dot(x * 1/4 * size / r + size / 2, -(y * 1/4 * size / r - size / 2))
}

onMounted(async () => {
    await graphic()
    canv.removeEventListener('click', (event: MouseEvent) => {
        dotRequest(event)
    })

    canv.addEventListener('click', (event: MouseEvent) => {
        dotRequest(event)
    })
    const response = await fetch('http://localhost:5100/api/points/last', {
            headers: {
                Authorization: `Bearer ${useAuthStore().token}`,
            }
        });
    try {
        const data = await response.json()
        usePointStore().x = data.x
        usePointStore().y = data.y
        usePointStore().r = data.r
        usePointStore().res = data.result
        usePointStore().time = data.time
    } catch(e) {
        //it's ok
    }
})

window.addEventListener('resize', graphic)
window.addEventListener('reset', graphic)

function dotRequest(event: MouseEvent) {
    if (validateR(coords.r)) {
        const reqData = canvas_get_dot(canv, event, coords.r)
        usePointStore().requestPlot(reqData.x.toFixed(2), reqData.y.toFixed(2), parseFloat(coords.r.toString()).toFixed(2))
    }
}

function form_dot() {
    dot(coords.x * 1/4 * size / coords.r + size / 2, -(coords.y * 1/4 * size / coords.r - size / 2))
}




function validateX(x: number) {
    if (!isNaN(x)) {
      
        let new_ = x
        if (new_ > 3 || new_ < -3) {
            msg('Значение x должно являться числом в диапазоне от -3 до 3')
            return false
        }
        return true
    } 
    msg('Значение x должно являться числом в диапазоне от -3 до 3')
    return false
}

function validateY(y: number) {
    if (!isNaN(y)) {
        let new_ = y
        if (new_ > 5 || new_ < -5) {
            msg('Значение y должно являться числом в диапазоне от -5 до 5')
            return false
        }
        return true
    } 
    msg('Значение y должно являться числом в диапазоне от -5 до 5')
    return false
}

function isValidR(r: number) {
    if (!isNaN(r)) {
        let new_ = r
        if (new_ > 3 || new_ < 1) {
            return false
        }
        return true
    } 
    return false
}

function validateR(r: number) {
  if (isValidR(r)) {
    return true
  }
  msg('Значение r должно являться числом в диапазоне от 1 до 3')
  return false
}

function validateData(x: number, y: number, r: number) {
    return validateX(x) && validateY(y) && validateR(r);
}

const coords = reactive({
    x: 0,
    y: 0,
    r: 1
})

function onSubmit() {
    if (validateData(coords.x, coords.y, coords.r)) {
      usePointStore().requestForm(coords.x, coords.y, coords.r)
      form_dot()
    }
}

function rUpdate() {
    
    graphic()

}

async function manageClearing() {
    try {
        await usePointStore().clear()
        graphic()
        Swal.fire(
            'Удалено!',
            'Таблица успешно очищена',
            'success'
            )
    } catch(e) {
        Swal.fire(
            'Ошибка',
            'Ваши данные в безопасности',
            'error'
            )
    }
}

function clear() {
    
    

    Swal.fire({
    title: 'Вы уверены?',
    text: "Данные будет не восстановить!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Да, удалить!',
    cancelButtonText: 'Нет, отменить!',
    reverseButtons: true
    }).then((result) => {
    if (result.isConfirmed) {
        manageClearing() 
    } else if (
        result.dismiss === Swal.DismissReason.cancel
    ) {
        Swal.fire(
        'Отменено',
        'Ваши данные в безопасности',
        'error'
        )
    }
    })
}

</script>

<template>
    <div class="w-full">
        <div id="graph-div">
            <canvas class="m-auto mb-8" width="200" height="200"></canvas>
            <div class="text-center mb-8">
                <h1>Последний запрос</h1>
            </div>
            <div class="w-full mb-2 overflow-x-auto border-white border-2 border-solid rounded-lg">
                <table class="w-full text-center border-collapse">
                    <thead>
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
                            <td class="p-3">{{ usePointStore().x }}</td>
                            <td class="p-3">{{ usePointStore().y }}</td>
                            <td class="p-3">{{ usePointStore().r }}</td>
                            <td class="p-3">{{ usePointStore().res }}</td>
                            <td class="p-3">{{ usePointStore().time }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button class="hove hover:text-blue-500" @click="clear">Очистить таблицу</button>
        </div>
        <div id="main-div">
            <form class="max-w-sm m-auto" @submit.prevent="onSubmit">
                <div class="mb-4">
                    <label for="x" class="block text-gray-300 text-sm font-bold mb-2">Значение X</label>
                    <input type="text" id="x" placeholder="(-3 .. 3) default=0" v-model="coords.x"
                    class="text-gray-300 border-4 py-2 px-3 border-solid
           border-gray-300 focus:border-blue-500 focus:outline-none
            bg-transparent focus:translate-x-4 transition duration-300
            w-full rounded shadow appearance-none focus:text-blue-500">
                </div>
                <div class="mb-4">
                    <label for="y" class="block text-gray-300 text-sm font-bold mb-2">Значение Y</label>
                    <input type="text" id="y" placeholder="(-5 .. 5) default=0" v-model="coords.y"
                    class="text-gray-300 border-4 py-2 px-3 border-solid
           border-gray-300 focus:border-blue-500 focus:outline-none
            bg-transparent focus:translate-x-4 transition duration-300
            w-full rounded shadow appearance-none focus:text-blue-500">
                </div>
                <div class="mb-6">
                    <label for="r" class="block text-gray-300 text-sm font-bold mb-2">Значение R</label>
                    <input @input="rUpdate" type="text" id="r" placeholder="(1 .. 3) required" v-model="coords.r"
                    class="text-gray-300 border-4 py-2 px-3 border-solid
           border-gray-300 focus:border-blue-500 focus:outline-none
            bg-transparent focus:translate-x-4 transition duration-300
            w-full rounded shadow appearance-none focus:text-blue-500">
                </div>
                <div class="flex items mb-4">
                    <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Проверить
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>