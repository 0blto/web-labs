<script lang="ts" setup>
import { processSlotOutlet } from '@vue/compiler-core';
import { onMounted } from 'vue';



let canv, ctx
let size = 300,
default_line_width = 3,
def = 15,
default_margin = 10

function params() {
    
    if (window.innerWidth < 300) {
        size = 150
    } else if (window.innerWidth > 400) {
        size = 350
    } else if (window.innerWidth > 500) {
        size = 500
    }
    canv.height = size
    canv.width = size
    
}

function rect(color: string, fromX: number, fromY: number, lenX: number, lenY: number) {
    ctx.fillStyle = color
    ctx.fillRect(fromX, fromY, lenX, lenY)
    
}

function arc(color: string, centerX: number, centerY: number, radius: number, from: number, to: number, isFilled: boolean) {
    ctx.lineWidth = default_line_width
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, from, to)
    if (isFilled) {
        ctx.fill()
    } else {
        ctx.stroke()
    }
    ctx.closePath()
}

function line(color: string, fromX: number, fromY: number, length: number, width: number, angle: number) {
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(length * Math.sin(angle) + size / 2, -length * Math.cos(angle) + size / 2)
    ctx.stroke()
    ctx.closePath()
}

onMounted(() => {
    canv = document.querySelector('canvas')
    ctx = canv?.getContext('2d')
    params()
    rect('black', 0, 0, size, size)
    line('blue', 0, size / 2, size, default_line_width, Math.PI / 2)
    line('blue', size / 2, 0, size, default_line_width, Math.PI)
    ctx.strokeStyle = 'blue'
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
    
    ctx.font = `${size/25}px Arial`
    ctx.textAlign = 'right'
    ctx.fillStyle = 'white'
    ctx.textBaseline = 'top'

    ctx.fillText(`${halfRadius}`, size / 2 - default_margin, 3 / 8 * size)
    ctx.fillText(`${radius}`, size / 2 - default_margin, 1 / 4 * size)
    ctx.fillText(`-${radius}`, size / 2 - default_margin, size - 1 / 4 * size)
    ctx.fillText(`-${halfRadius}`, size / 2 - default_margin, size - 3 / 8 * size)
    ctx.fillText('Y', size / 2 - default_margin, default_margin * 3)
    //ctx.textBaseline = 'bottom'
    ctx.fillText(`-${halfRadius}`, 3 / 8 * size, size / 2 + default_margin)
    ctx.fillText(`-${radius}`, 1 / 4 * size, size / 2 + default_margin)
    ctx.fillText(`${radius}`, 3/4 * size, size / 2 + default_margin)
    ctx.fillText(`${halfRadius}`, 5/8 * size, size / 2 + default_margin)
    ctx.fillText('X', size - 2 * default_margin, size / 2 + default_margin)

})


</script>

<template>
    <canvas class="m-auto"></canvas>
</template>