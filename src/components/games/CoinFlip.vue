<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Application, Graphics, Text, TextStyle, Ticker } from 'pixi.js'

let app: Application
const containerRef = ref<HTMLElement | null>(null)
let coin: Graphics
let flipping = false
let resultText: Text
let isHeads = true // Track the current face of the coin

function createCoin(color: string) {
  const circle = new Graphics()
  circle.beginFill(color === 'blue' ? 0x0000ff : 0xff0000) // Blue for heads, red for tails
  circle.drawCircle(0, 0, 50)
  circle.endFill()
  return circle
}

async function initPixi() {
  if (!containerRef.value) return

  // Create application
  app = new Application()
  await app.init({
    background: '#1D232A',
    width: containerRef.value.offsetWidth,
    height: containerRef.value.offsetHeight,
  })

  // Append canvas
  containerRef.value.appendChild(app.canvas)

  // Create initial coin (blue by default)
  coin = createCoin('blue')
  coin.x = app.screen.width / 2
  coin.y = app.screen.height / 2

  // Add click interaction
  coin.eventMode = 'static'
  coin.cursor = 'pointer'
  coin.addListener('pointerdown', flipCoin)

  app.stage.addChild(coin)

  // Add UI text
  const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 'white',
    fontWeight: 'bold',
  })

  resultText = new Text('Click to Flip!', style)
  resultText.anchor.set(0.5)
  resultText.x = app.screen.width / 2
  resultText.y = app.screen.height / 1.2
  app.stage.addChild(resultText)
}

function flipCoin() {
  if (flipping) return
  flipping = true

  const outcome = Math.random() < 0.5 ? 'blue' : 'red'
  const totalFrames = 60
  let frame = 0

  const ticker = new Ticker()
  ticker.add(() => {
    frame++

    // Scale effect: Shrink the coin horizontally
    const progress = frame / totalFrames
    coin.scale.x = Math.cos(progress * Math.PI) // Shrinks to 0, then expands

    // Swap color when at the thinnest point
    if (frame === Math.floor(totalFrames / 2)) {
      isHeads = !isHeads
      app.stage.removeChild(coin)
      coin = createCoin(isHeads ? 'blue' : 'red')
      coin.x = app.screen.width / 2
      coin.y = app.screen.height / 2
      coin.scale.x = 0 // Start from thin state
      coin.eventMode = 'static'
      coin.cursor = 'pointer'
      coin.addListener('pointerdown', flipCoin)
      app.stage.addChild(coin)
    }

    if (frame >= totalFrames) {
      ticker.stop()
      flipping = false
      resultText.text = isHeads ? 'Heads! You win!' : 'Tails! You lose!'
    }
  })

  ticker.start()
}

onMounted(() => {
  initPixi()
})

onUnmounted(() => {
  if (app) {
    app.destroy(true)
  }
})
</script>

<template>
  <div ref="containerRef" id="pixi-container"></div>
</template>

<style scoped>
#pixi-container {
  width: 100%;
  height: calc(100% - 3rem);
}
</style>
