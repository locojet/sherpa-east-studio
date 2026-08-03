<script setup lang="ts">
import { computed, reactive } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const cursor = reactive({
  x: 54,
  y: 40,
  tiltX: 0,
  tiltY: 0,
})

const heroVideos = import.meta.glob('@/assets/videos/*.{mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const preferredVideoNames = [
  'sherpa-east-hero.webm',
  'sherpa-east-hero.mp4',
  'sherpa-east-hero.mov',
]

const heroVideoSrc = computed(() => {
  const entries = Object.entries(heroVideos)

  return (
    preferredVideoNames
      .map((name) => entries.find(([path]) => path.endsWith(name))?.[1])
      .find(Boolean) ?? entries[0]?.[1]
  )
})

const heroStyle = computed(() => ({
  '--cursor-x': `${cursor.x}%`,
  '--cursor-y': `${cursor.y}%`,
  '--tilt-x': `${cursor.tiltX}deg`,
  '--tilt-y': `${cursor.tiltY}deg`,
  '--logo-shift-x': `${cursor.tiltX * -2}px`,
  '--logo-shift-y': `${cursor.tiltY * 2}px`,
  '--reflection-tilt-x': `${cursor.tiltX * 0.34}deg`,
  '--reflection-shift-x': `${cursor.tiltX * 0.7}px`,
  '--reflection-shift-y': `${cursor.tiltY * 0.9}px`,
}))

function handlePointerMove(event: PointerEvent) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  cursor.x = Number((((event.clientX - rect.left) / rect.width) * 100).toFixed(2))
  cursor.y = Number((((event.clientY - rect.top) / rect.height) * 100).toFixed(2))
  cursor.tiltX = Number(((cursor.x - 50) / 8).toFixed(2))
  cursor.tiltY = Number(((50 - cursor.y) / 10).toFixed(2))
}

function resetPointerEffect() {
  cursor.x = 54
  cursor.y = 40
  cursor.tiltX = 0
  cursor.tiltY = 0
}
</script>

<template>
  <section
    id="inicio"
    class="hero"
    :style="heroStyle"
    @pointermove="handlePointerMove"
    @pointerleave="resetPointerEffect"
  >
    <div class="hero__visual" aria-hidden="true">
      <div class="hero__console"></div>
      <div class="hero__summit">
        <span v-for="line in 7" :key="line"></span>
      </div>
    </div>

    <div class="container hero__content">
      <div class="hero__brand-stage" data-reveal>
        <div class="hero__video-frame" aria-hidden="true">
          <video
            v-if="heroVideoSrc"
            class="hero__video"
            :src="heroVideoSrc"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          ></video>
          <div v-else class="hero__video-placeholder"></div>
        </div>
        <div class="hero__video-reflection" aria-hidden="true">
          <video
            v-if="heroVideoSrc"
            class="hero__video"
            :src="heroVideoSrc"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          ></video>
          <div v-else class="hero__video-placeholder"></div>
        </div>
        <div class="hero__floor-light" aria-hidden="true"></div>
        <div
          class="hero__mark"
          :class="{ 'hero__mark--docked': ui.isHeaderCompact }"
          aria-hidden="true"
        >
          <BrandLogo mark-only />
        </div>
        <div class="hero__wordmark" :class="{ 'hero__wordmark--docked': ui.isHeaderCompact }">
          <BrandLogo text-only />
        </div>
      </div>
      <p class="eyebrow" data-reveal>Tonstudio / Berlin Höhenlage</p>
      <h1 class="display-title" data-reveal>Klang mit Höhe, Tiefe und Charakter</h1>
      <p class="hero__copy" data-reveal>
        Aufnahme, Produktion und Klangerlebnisse für Künstler, Marken und bewegte Bilder.
      </p>
      <div class="hero__actions" data-reveal>
        <BaseButton :to="{ path: '/', hash: '#studio' }">Studio entdecken</BaseButton>
        <BaseButton :to="{ path: '/', hash: '#proyectos' }" variant="secondary">
          Projekte anhören
        </BaseButton>
      </div>
      <div class="hero__wave" aria-hidden="true" data-reveal>
        <span
          v-for="bar in 42"
          :key="bar"
          :style="{
            animationDelay: `${bar * -38}ms`,
            animationDuration: `${900 + (bar % 9) * 72}ms`,
          }"
        ></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  min-height: 100svh;
  align-items: center;
  justify-content: center;
  padding: calc(var(--header-height) + 42px) 0 72px;
  overflow: hidden;
  background: radial-gradient(
      circle at var(--cursor-x) var(--cursor-y),
      rgba(215, 181, 109, 0.18),
      transparent 18rem
    ),
    linear-gradient(
      115deg,
      rgba(5, 4, 3, 0.96) 0%,
      rgba(17, 16, 14, 0.9) 58%,
      rgba(5, 4, 3, 0.98) 100%
    );
}

.hero::after {
  position: absolute;
  inset: auto 0 0;
  height: 28vh;
  pointer-events: none;
  content: '';
  background: linear-gradient(180deg, transparent, var(--color-ink));
}

.hero__content {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: start;
  max-width: none;
}

.hero__brand-stage {
  position: relative;
  display: grid;
  --hero-video-top: clamp(10px, 2.5vw, 24px);
  --hero-video-width: min(720px, 92vw);
  --hero-video-height: min(405px, 51.75vw);
  width: min(780px, 100%);
  min-height: clamp(430px, 58vw, 640px);
  place-items: center;
  margin-inline: auto;
  margin-bottom: clamp(1.8rem, 4vw, 3.4rem);
  perspective: 1100px;
}

.hero__video-frame {
  position: absolute;
  top: var(--hero-video-top);
  left: 50%;
  z-index: 0;
  width: var(--hero-video-width);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid rgba(241, 215, 141, 0.36);
  border-radius: 8px;
  background: radial-gradient(
      circle at var(--cursor-x) var(--cursor-y),
      rgba(241, 215, 141, 0.26),
      transparent 12rem
    ),
    linear-gradient(135deg, rgba(246, 239, 225, 0.08), rgba(5, 4, 3, 0.64));
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 0 34px rgba(215, 181, 109, 0.28),
    0 38px 90px rgba(0, 0, 0, 0.58);
  transform: translate3d(-50%, -8px, -12px) rotateX(var(--tilt-y)) rotateY(var(--tilt-x));
  transform-style: preserve-3d;
  transition:
    transform 420ms var(--ease-out),
    box-shadow 420ms var(--ease-out);
}

.hero__video-frame::before,
.hero__video-frame::after {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  content: '';
}

.hero__video-frame::before {
  background: radial-gradient(
      circle at var(--cursor-x) var(--cursor-y),
      rgba(255, 242, 188, 0.2),
      transparent 28%
    ),
    linear-gradient(180deg, rgba(5, 4, 3, 0.04), rgba(5, 4, 3, 0.52));
  mix-blend-mode: screen;
}

.hero__video-frame::after {
  border: 1px solid rgba(246, 239, 225, 0.12);
  box-shadow: 0 0 28px rgba(241, 215, 141, 0.24) inset;
}

.hero__video,
.hero__video-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(1.1px) brightness(0.68) saturate(1.08);
  transform: scale(1.03);
}

.hero__video-placeholder {
  background: radial-gradient(circle at 50% 42%, rgba(215, 181, 109, 0.24), transparent 10rem),
    repeating-linear-gradient(90deg, rgba(246, 239, 225, 0.08) 0 1px, transparent 1px 22px),
    linear-gradient(145deg, #1e1a15, #070605);
}

.hero__video-reflection {
  position: absolute;
  top: calc(var(--hero-video-top) + var(--hero-video-height) + 42px);
  left: 50%;
  z-index: 0;
  width: var(--hero-video-width);
  height: clamp(110px, 16vw, 190px);
  overflow: hidden;
  pointer-events: none;
  border-radius: 0 0 52% 52%;
  opacity: 0.24;
  filter: blur(13px) saturate(1.04);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.72), transparent 82%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.72), transparent 82%);
  transform: translateX(-50%) translateY(18px) rotateX(72deg) rotateY(var(--reflection-tilt-x))
    translate3d(var(--reflection-shift-x), var(--reflection-shift-y), -28px) scaleX(0.92);
  transform-origin: center top;
  transition:
    filter 420ms var(--ease-out),
    opacity 420ms var(--ease-out),
    transform 420ms var(--ease-out);
}

.hero__video-reflection .hero__video,
.hero__video-reflection .hero__video-placeholder {
  height: var(--hero-video-height);
  object-fit: cover;
  transform: translateY(-42%) scaleY(-1) scale(1.06);
  filter: brightness(0.84) saturate(1.24);
}

.hero__video-reflection::after {
  position: absolute;
  inset: 0;
  content: '';
  background: radial-gradient(ellipse at center, rgba(246, 239, 225, 0.1), transparent 58%),
    linear-gradient(90deg, transparent, rgba(246, 239, 225, 0.06), transparent);
  mix-blend-mode: screen;
}

.hero__floor-light {
  position: absolute;
  right: 4%;
  bottom: clamp(28px, 6vw, 58px);
  left: 4%;
  z-index: 0;
  height: clamp(120px, 16vw, 210px);
  pointer-events: none;
  background: radial-gradient(
      ellipse at center,
      rgba(246, 239, 225, 0.08),
      rgba(246, 239, 225, 0.035) 38%,
      transparent 72%
    ),
    linear-gradient(90deg, transparent, rgba(246, 239, 225, 0.04), transparent);
  filter: blur(18px);
  opacity: 0.42;
  transform: rotateX(74deg) translateY(56px) scaleX(1.08);
  transform-origin: center bottom;
}

.hero__mark {
  position: absolute;
  top: var(--hero-video-top);
  left: 50%;
  z-index: 3;
  display: grid;
  width: var(--hero-video-width);
  height: var(--hero-video-height);
  place-items: center;
  pointer-events: none;
  opacity: 1;
  transform: translate3d(-50%, -6px, 70px);
  transition:
    opacity 320ms var(--ease-out),
    transform 420ms var(--ease-out);
}

.hero__mark :deep(.brand-logo--mark-only) {
  width: min(360px, 46vw);
  height: min(198px, 25.4vw);
}

.hero__mark :deep(.brand-logo__image) {
  filter: drop-shadow(0 22px 34px rgba(0, 0, 0, 0.66))
    drop-shadow(0 0 28px rgba(241, 215, 141, 0.22));
}

.hero__wordmark {
  position: absolute;
  top: calc(var(--hero-video-top) + var(--hero-video-height) + clamp(0.75rem, 1.4vw, 1.1rem));
  left: 50%;
  z-index: 3;
  display: inline-flex;
  justify-content: center;
  max-width: min(420px, calc(100vw - 48px));
  opacity: 1;
  text-align: center;
  transform: translateX(-50%);
  transition:
    opacity 320ms var(--ease-out),
    transform 420ms var(--ease-out);
}

.hero__wordmark :deep(.brand-logo__fallback) {
  align-items: center;
  color: var(--color-gold-bright);
  font-family: var(--font-display);
  text-align: center;
  filter: drop-shadow(0 12px 22px rgba(0, 0, 0, 0.68));
}

.hero__wordmark :deep(.brand-logo__fallback span) {
  font-size: clamp(1.18rem, 2.1vw, 1.58rem);
  font-weight: 800;
  letter-spacing: 0.18em;
  white-space: nowrap;
}

.hero__wordmark :deep(.brand-logo__fallback small) {
  color: var(--color-muted);
  font-size: clamp(0.54rem, 0.9vw, 0.68rem);
  letter-spacing: 0.42em;
  white-space: nowrap;
}

.hero__copy {
  max-width: 560px;
  margin: clamp(1rem, 2vw, 1.4rem) 0 0;
  color: var(--color-muted);
  font-size: clamp(1.05rem, 2vw, 1.35rem);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: clamp(1.8rem, 4vw, 3rem);
}

.hero__visual {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero__console {
  position: absolute;
  right: min(5vw, 80px);
  bottom: 8vh;
  width: min(520px, 55vw);
  aspect-ratio: 1.6;
  border: 1px solid rgba(246, 239, 225, 0.1);
  border-radius: var(--radius-md);
  background:
    linear-gradient(90deg, rgba(215, 181, 109, 0.12) 1px, transparent 1px) 0 0 / 38px 100%,
    linear-gradient(180deg, rgba(246, 239, 225, 0.12) 1px, transparent 1px) 0 0 / 100% 44px,
    linear-gradient(145deg, rgba(246, 239, 225, 0.08), rgba(5, 4, 3, 0.1));
  box-shadow: var(--shadow-soft);
  transform: perspective(900px) rotateX(56deg) rotateZ(-6deg);
  opacity: 0.72;
}

.hero__summit {
  position: absolute;
  right: clamp(-120px, -6vw, -40px);
  bottom: 18vh;
  width: min(680px, 70vw);
  height: 44vh;
  opacity: 0.72;
}

.hero__summit span {
  position: absolute;
  right: 0;
  bottom: 18px;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(215, 181, 109, 0.34), transparent);
  clip-path: polygon(0 100%, 20% 72%, 35% 84%, 51% 30%, 63% 54%, 77% 14%, 100% 76%, 100% 100%);
}

.hero__summit span:nth-child(1) {
  bottom: 18px;
}

.hero__summit span:nth-child(2) {
  bottom: 36px;
}

.hero__summit span:nth-child(3) {
  bottom: 54px;
}

.hero__summit span:nth-child(4) {
  bottom: 72px;
}

.hero__summit span:nth-child(5) {
  bottom: 90px;
}

.hero__summit span:nth-child(6) {
  bottom: 108px;
}

.hero__summit span:nth-child(7) {
  bottom: 126px;
}

.hero__wave {
  position: relative;
  z-index: 2;
  display: flex;
  width: min(620px, 100%);
  height: clamp(76px, 10vw, 112px);
  align-items: center;
  gap: 7px;
  margin-top: clamp(2rem, 5vw, 4.2rem);
  padding: 0.6rem 0;
  overflow: hidden;
  opacity: 0.9;
  border-top: 1px solid rgba(241, 215, 141, 0.16);
  border-bottom: 1px solid rgba(246, 239, 225, 0.08);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 9%, black 91%, transparent);
  mask-image: linear-gradient(90deg, transparent, black 9%, black 91%, transparent);
}

.hero__wave span {
  flex: 1 1 2px;
  min-width: 2px;
  max-width: 4px;
  height: 100%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(246, 239, 225, 0.28),
    var(--color-gold-bright),
    rgba(246, 239, 225, 0.24),
    transparent
  );
  transform: scaleY(0.25);
  transform-origin: center;
  animation-name: meterRise;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@media (max-width: 820px) {
  .hero {
    min-height: 92svh;
    padding-top: calc(var(--header-height) + 24px);
  }

  .hero__content {
    justify-items: center;
    text-align: center;
  }

  .hero__actions {
    justify-content: center;
  }

  .hero__actions :deep(.base-button) {
    width: auto;
  }

  .hero__brand-stage {
    --hero-video-width: min(560px, calc(100vw - 28px));
    --hero-video-height: min(315px, calc((100vw - 28px) * 0.5625));
    width: 100%;
    min-height: clamp(330px, 82vw, 480px);
    margin-bottom: clamp(1.2rem, 6vw, 2.4rem);
  }

  .hero__video-frame {
    width: var(--hero-video-width);
    transform: translate3d(-50%, -4px, -12px) rotateX(0deg) rotateY(0deg);
  }

  .hero__video-reflection {
    top: calc(var(--hero-video-top) + var(--hero-video-height) + 30px);
    width: var(--hero-video-width);
    height: clamp(92px, 24vw, 150px);
  }

  .hero__console {
    right: -120px;
    width: 520px;
    opacity: 0.38;
  }

  .hero__summit {
    right: -180px;
    width: 620px;
    opacity: 0.52;
  }

  .hero__wave {
    width: min(520px, calc(100vw - 42px));
    height: 74px;
    margin-top: 2.2rem;
    gap: 5px;
  }

  .hero__copy {
    margin-inline: auto;
  }

  .hero__mark {
    transform: translate3d(-50%, -4px, 70px);
  }

  .hero__mark :deep(.brand-logo--mark-only) {
    width: min(250px, 58vw);
    height: min(138px, 32vw);
  }

  .hero__wordmark :deep(.brand-logo__fallback span) {
    font-size: clamp(1.02rem, 5vw, 1.36rem);
  }

  .hero__wordmark :deep(.brand-logo__fallback small) {
    font-size: clamp(0.52rem, 2.4vw, 0.62rem);
  }

  .hero__mark--docked,
  .hero__wordmark--docked {
    opacity: 0;
    pointer-events: none;
  }

  .hero__mark--docked {
    transform: translate3d(-50%, -32px, 70px) scale(0.72);
  }

  .hero__wordmark--docked {
    transform: translate(-50%, -28px) scale(0.86);
  }
}

@media (max-width: 520px) {
  .hero__brand-stage {
    --hero-video-width: calc(100vw - 36px);
    --hero-video-height: calc((100vw - 36px) * 0.5625);
    min-height: clamp(300px, 84vw, 400px);
  }

  .hero__mark :deep(.brand-logo--mark-only) {
    width: min(220px, 56vw);
    height: min(122px, 31vw);
  }

  .hero__wave {
    width: calc(100vw - 36px);
    height: 68px;
  }
}
</style>
