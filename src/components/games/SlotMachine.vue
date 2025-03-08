<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Application, Assets, Sprite, Container, BlurFilter, Graphics, FillGradient, Text, TextStyle, Color } from 'pixi.js'

let app: Application

const containerRef = ref<HTMLElement | null>(null)

async function initPixi() {
  try {
    if (!containerRef.value) return

    // Create application
    app = new Application()
    await app.init({
      background: '#1099bb',
      width: containerRef.value.offsetWidth,
      height: containerRef.value.offsetHeight,
    })

    // Append canvas
    const container = document.getElementById('axx')
    if (container) {
      container.appendChild(app.canvas)
    }

    const REEL_COUNT = 3
    const SYMBOL_COUNT = 3

    const REEL_WIDTH = containerRef.value.offsetWidth / REEL_COUNT
    const SYMBOL_WIDTH = containerRef.value.offsetHeight / SYMBOL_COUNT

    const reels: any = []
    const reelContainer = new Container()

    for (let i = 0; i < REEL_COUNT; i++) {
      const texture = await Assets.load('https://pixijs.com/assets/bunny.png')
      const rc = new Container()
      rc.x = i * REEL_WIDTH
      reelContainer.addChild(rc)
      const reel = {
        container: rc,
        symbols: [] as Sprite[],
        position: 0,
        previousPosition: 0,
        blur: new BlurFilter(),
      }
      reel.blur.blur = 0
      rc.filters = [reel.blur]
      for (let j = 0; j < SYMBOL_COUNT; j++) {
        const symbol = new Sprite(texture)
        symbol.y = j * SYMBOL_WIDTH
        symbol.scale.x = symbol.scale.y = Math.min(
          SYMBOL_WIDTH / symbol.width,
          SYMBOL_WIDTH / symbol.height,
        )
        symbol.x = Math.round((SYMBOL_WIDTH - symbol.width) / 2)
        reel.symbols.push(symbol)
        rc.addChild(symbol)
      }
      reels.push(reel)
    }
    app.stage.addChild(reelContainer)

    // Build top & bottom covers and position reelContainer
    const margin = (app.screen.height - SYMBOL_WIDTH * 3) / 2
    reelContainer.y = margin
    const top = new Graphics().rect(0, 0, app.screen.width, margin).fill({ color: 0x0 });
    const bottom = new Graphics().rect(0, app.screen.height - margin, app.screen.width, margin).fill({ color: 0x0 });

    const fill = new FillGradient(0, 0, 0, 2);

    const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());

    colors.forEach((number, index) =>
    {
        const ratio = index / colors.length;

        fill.addColorStop(ratio, number);
    });

    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: { fill },
        stroke: { color: 0x4a1850, width: 5 },
        dropShadow: {
            color: 0x000000,
            angle: Math.PI / 6,
            blur: 4,
            distance: 6,
        },
        wordWrap: true,
        wordWrapWidth: 440,
    });

    const playText = new Text('Spin the wheels!', style);

    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2);
    bottom.addChild(playText);

    // Add header text
    const headerText = new Text('PIXI MONSTER SLOTS!', style);

    headerText.x = Math.round((top.width - headerText.width) / 2);
    headerText.y = Math.round(margin);
    top.addChild(headerText);

    app.stage.addChild(top);
    app.stage.addChild(bottom);

    // Set the interactivity.
    bottom.eventMode = 'static';
    bottom.cursor = 'pointer';
    bottom.addListener('pointerdown', () =>
    {
        startPlay();
    });

    let running = false;

    // Function to start playing.
    function startPlay()
    {
        if (running) return;
        running = true;

        for (let i = 0; i < reels.length; i++)
        {
            const r = reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;

            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    // Reels done handler.
    function reelsComplete()
    {
        running = false;
    }



    // Load and setup bunny
    // const texture = await Assets.load('https://pixijs.com/assets/bunny.png')
    // const bunny = new Sprite(texture)

    // bunny.anchor.set(0.5)
    // bunny.x = app.screen.width / 2
    // bunny.y = app.screen.height / 2

    // app.stage.addChild(bunny)

    // Animation
    app.ticker.add((time) => {
      // bunny.rotation += 0.1 * time.deltaTime
    })
  } catch (error) {
    console.error('Failed to initialize PixiJS:', error)
  }
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
  <div ref="containerRef" id="axx"></div>
</template>

<style scoped>
#axx {
  width: 100%;
  height: calc(100% - 3rem);
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* background-color: #1099bb; */
}
</style>
