<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { tracks } from '@/data/tracks'
import type { TrackItem } from '@/types/content'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const audioElement = ref<HTMLAudioElement | null>(null)
const currentIndex = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.78)
const isPlaying = ref(false)
const playerMessage = ref('')
const visualizerBars = Array.from({ length: 24 }, (_, index) => index)
const initialTrack = tracks[0] as TrackItem

const currentTrack = computed<TrackItem>(() => tracks[currentIndex.value] ?? initialTrack)
const progressPercent = computed(() =>
  duration.value > 0 ? Math.min((currentTime.value / duration.value) * 100, 100) : 0,
)

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}

async function playCurrentTrack() {
  const audio = audioElement.value

  if (!audio) {
    return
  }

  try {
    await audio.play()
    isPlaying.value = true
    playerMessage.value = ''
  } catch {
    isPlaying.value = false
    playerMessage.value = 'Das Audio konnte nicht gestartet werden. Bitte versuche es erneut.'
  }
}

function pauseCurrentTrack() {
  audioElement.value?.pause()
  isPlaying.value = false
}

async function togglePlay() {
  if (isPlaying.value) {
    pauseCurrentTrack()
    return
  }

  await playCurrentTrack()
}

async function selectTrack(index: number) {
  const wasPlaying = isPlaying.value
  currentIndex.value = index
  currentTime.value = 0
  duration.value = 0
  await nextTick()
  audioElement.value?.load()

  if (wasPlaying) {
    await playCurrentTrack()
  }
}

async function nextTrack() {
  await selectTrack((currentIndex.value + 1) % tracks.length)
}

async function previousTrack() {
  await selectTrack((currentIndex.value - 1 + tracks.length) % tracks.length)
}

function updateMetadata() {
  duration.value = audioElement.value?.duration ?? 0
}

function updateTime() {
  currentTime.value = audioElement.value?.currentTime ?? 0
}

function seek(event: Event) {
  const audio = audioElement.value
  const input = event.target as HTMLInputElement

  if (!audio) {
    return
  }

  const nextTime = Number(input.value)
  audio.currentTime = nextTime
  currentTime.value = nextTime
}

watch(volume, (nextVolume) => {
  if (audioElement.value) {
    audioElement.value.volume = nextVolume
  }
})
</script>

<template>
  <section id="audio" class="section audio-section">
    <div class="container audio-section__grid">
      <SectionHeading
        eyebrow="Audio"
        title="Projekte, die man hört, bevor man sie erklärt"
        copy="Ein eigener Player, vorbereitet für echte Sessions, Master-Versionen und Ausschnitte aus dem Studio."
      />

      <div class="audio-player" data-reveal>
        <audio
          ref="audioElement"
          :src="currentTrack.src"
          preload="metadata"
          @loadedmetadata="updateMetadata"
          @timeupdate="updateTime"
          @ended="nextTrack"
          @play="isPlaying = true"
          @pause="isPlaying = false"
        ></audio>

        <div class="audio-player__cover" :aria-label="currentTrack.coverLabel" role="img">
          <span>{{ currentTrack.mood }}</span>
        </div>

        <div class="audio-player__main">
          <p class="eyebrow">Läuft gerade</p>
          <h3>{{ currentTrack.title }}</h3>
          <p>{{ currentTrack.artist }}</p>

          <div
            class="audio-player__visualizer"
            :class="{ 'audio-player__visualizer--active': isPlaying }"
            aria-hidden="true"
          >
            <span
              v-for="bar in visualizerBars"
              :key="bar"
              :style="{
                animationDelay: `${bar * -42}ms`,
                animationDuration: `${820 + (bar % 8) * 90}ms`,
              }"
            ></span>
          </div>

          <div class="audio-player__timeline">
            <span>{{ formatTime(currentTime) }}</span>
            <input
              type="range"
              min="0"
              :max="duration || 0"
              step="0.01"
              :value="currentTime"
              :aria-valuetext="`${Math.round(progressPercent)} Prozent abgespielt`"
              aria-label="Wiedergabefortschritt"
              @input="seek"
            />
            <span>{{ formatTime(duration) || currentTrack.durationHint }}</span>
          </div>

          <div class="audio-player__controls">
            <button type="button" aria-label="Vorheriger Titel" @click="previousTrack">
              Zurück
            </button>
            <button
              class="audio-player__play"
              type="button"
              :aria-label="isPlaying ? 'Pausieren' : 'Abspielen'"
              @click="togglePlay"
            >
              {{ isPlaying ? 'Pause' : 'Abspielen' }}
            </button>
            <button type="button" aria-label="Nächster Titel" @click="nextTrack">Weiter</button>
            <label>
              <span>Lautst.</span>
              <input
                v-model.number="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                aria-label="Lautstärke"
              />
            </label>
          </div>

          <p v-if="playerMessage" class="audio-player__message" role="status">
            {{ playerMessage }}
          </p>
        </div>

        <div class="audio-player__list" aria-label="Liste der Demo-Titel">
          <button
            v-for="(track, index) in tracks"
            :key="track.id"
            type="button"
            :class="{ 'is-active': index === currentIndex }"
            @click="selectTrack(index)"
          >
            <span>{{ track.title }}</span>
            <small>{{ track.artist }}</small>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.audio-section {
  background: linear-gradient(180deg, var(--color-ink), #12100d 48%, var(--color-ink));
}

.audio-section__grid {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
}

.audio-player {
  display: grid;
  grid-template-columns: minmax(220px, 0.72fr) minmax(320px, 1.15fr) minmax(210px, 0.6fr);
  overflow: hidden;
  border: 1px solid rgba(215, 181, 109, 0.18);
  border-radius: var(--radius-md);
  background: radial-gradient(circle at 22% 12%, rgba(215, 181, 109, 0.16), transparent 20rem),
    rgba(246, 239, 225, 0.045);
  box-shadow: var(--shadow-soft);
}

.audio-player__cover {
  position: relative;
  display: grid;
  min-height: 430px;
  align-items: end;
  padding: 1.2rem;
  overflow: hidden;
  background: linear-gradient(145deg, rgba(215, 181, 109, 0.16), transparent 38%),
    repeating-linear-gradient(0deg, rgba(246, 239, 225, 0.08) 0 1px, transparent 1px 18px),
    linear-gradient(160deg, #27231d, #070605);
}

.audio-player__cover::before {
  position: absolute;
  inset: 14%;
  content: '';
  border: 1px solid rgba(215, 181, 109, 0.32);
  clip-path: polygon(0 100%, 18% 70%, 35% 78%, 52% 22%, 66% 48%, 84% 4%, 100% 64%, 100% 100%);
}

.audio-player__cover span {
  position: relative;
  z-index: 1;
  width: max-content;
  padding: 0.46rem 0.58rem;
  color: var(--color-ink);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--color-gold-bright);
}

.audio-player__main {
  display: grid;
  align-content: center;
  padding: clamp(1.3rem, 4vw, 3rem);
}

h3 {
  margin: 0;
  color: var(--color-warm-white);
  font-family: var(--font-display);
  font-size: clamp(2.3rem, 4vw, 4.3rem);
  line-height: 0.92;
}

.audio-player__main > p:not(.eyebrow),
.audio-player__message {
  margin: 0.45rem 0 0;
  color: var(--color-muted);
}

.audio-player__visualizer {
  display: flex;
  height: 96px;
  align-items: center;
  gap: 6px;
  margin: 2rem 0;
}

.audio-player__visualizer span {
  width: 4px;
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(180deg, transparent, var(--color-gold), transparent);
  transform: scaleY(0.18);
  transform-origin: center;
}

.audio-player__visualizer--active span {
  animation: meterRise 900ms ease-in-out infinite;
}

.audio-player__timeline {
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  gap: 0.8rem;
  align-items: center;
  color: var(--color-stone);
  font-size: 0.8rem;
}

input[type='range'] {
  width: 100%;
  accent-color: var(--color-gold-bright);
}

.audio-player__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  align-items: center;
  margin-top: 1.4rem;
}

button {
  min-height: 42px;
  padding: 0.64rem 0.78rem;
  color: var(--color-warm-white);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid rgba(215, 181, 109, 0.22);
  border-radius: var(--radius-sm);
  background: rgba(246, 239, 225, 0.055);
  cursor: pointer;
}

.audio-player__play {
  color: var(--color-ink);
  background: var(--color-gold-bright);
}

label {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.72rem;
  color: var(--color-muted);
  border: 1px solid rgba(246, 239, 225, 0.1);
  border-radius: var(--radius-sm);
}

label input {
  width: 86px;
}

.audio-player__list {
  display: grid;
  align-content: stretch;
  border-left: 1px solid rgba(215, 181, 109, 0.14);
}

.audio-player__list button {
  display: grid;
  min-height: 0;
  align-content: center;
  gap: 0.2rem;
  padding: 1.1rem;
  text-align: left;
  border: 0;
  border-bottom: 1px solid rgba(246, 239, 225, 0.08);
  border-radius: 0;
}

.audio-player__list button.is-active {
  color: var(--color-ink);
  background: linear-gradient(135deg, var(--color-gold-bright), var(--color-gold));
}

.audio-player__list small {
  color: currentColor;
  opacity: 0.72;
}

@media (max-width: 980px) {
  .audio-player {
    grid-template-columns: 1fr;
  }

  .audio-player__cover {
    min-height: 260px;
  }

  .audio-player__list {
    border-left: 0;
    border-top: 1px solid rgba(215, 181, 109, 0.14);
  }
}

@media (max-width: 560px) {
  .audio-player__controls,
  label {
    display: grid;
    grid-template-columns: 1fr;
  }

  .audio-player__controls button,
  label {
    width: 100%;
  }
}
</style>
