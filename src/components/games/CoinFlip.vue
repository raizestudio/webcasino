<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Application, Graphics, Text, TextStyle } from 'pixi.js'

let app: Application
const containerRef = ref<HTMLElement | null>(null)
let coin: Graphics
let flipping = false
let resultText: Text

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

  let rotationCount = 10 // Number of flips
  const spinSpeed = 0.3
  const outcome = Math.random() < 0.5 ? 'blue' : 'red'

  const spin = setInterval(() => {
    coin.rotation += spinSpeed
    rotationCount--
    if (rotationCount <= 0) {
      clearInterval(spin)
      coin.rotation = 0

      // Change coin color
      app.stage.removeChild(coin)
      coin = createCoin(outcome)
      coin.x = app.screen.width / 2
      coin.y = app.screen.height / 2
      coin.eventMode = 'static'
      coin.cursor = 'pointer'
      coin.addListener('pointerdown', flipCoin)
      app.stage.addChild(coin)

      flipping = false
      resultText.text = outcome === 'blue' ? 'Heads! You win!' : 'Tails! You lose!'
    }
  }, 100)
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
