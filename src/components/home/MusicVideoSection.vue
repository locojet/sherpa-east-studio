<script setup lang="ts">
import cornfieldImage from '@/assets/images/music-video-cornfield.jpg'
import forestSetupImage from '@/assets/images/music-video-forest-setup.jpg'
import forestWideImage from '@/assets/images/music-video-forest-wide.jpg'
import stageImage from '@/assets/images/music-video-stage.jpg'

interface MusicVideoPhoto {
  src: string
  alt: string
  position: string
}

const photos: MusicVideoPhoto[] = [
  {
    src: forestWideImage,
    alt: 'Kameraarbeit bei einem Musikvideodreh im Wald',
    position: 'center 48%',
  },
  {
    src: forestSetupImage,
    alt: 'Kamerateam richtet eine Szene im Wald ein',
    position: 'center 50%',
  },
  {
    src: cornfieldImage,
    alt: 'Musikvideodreh am Feld mit Kamera und Performer',
    position: 'center 52%',
  },
  {
    src: stageImage,
    alt: 'Musikvideodreh mit Band, Licht und Nebel auf der Bühne',
    position: 'center 48%',
  },
]

const loops = [0, 1]
</script>

<template>
  <section id="musikvideodreh" class="section section--tight music-video-section">
    <div class="container">
      <div class="music-video-section__intro" data-reveal>
        <div>
          <p class="eyebrow">Musikvideodreh</p>
          <h2>Bilder, die den Rhythmus tragen</h2>
        </div>
        <p class="section-copy">
          Ob Wald, Bühne oder rohe Location: Sherpa East entwickelt Musikvideos mit Blick für
          Performance, Atmosphäre und die Geschichte hinter dem Song.
        </p>
      </div>

      <div class="music-video-section__rail" tabindex="0" data-reveal>
        <div class="music-video-section__track">
          <div
            v-for="loop in loops"
            :key="loop"
            class="music-video-section__group"
            :aria-hidden="loop === 1"
          >
            <figure
              v-for="photo in photos"
              :key="`${loop}-${photo.src}`"
              class="music-video-section__frame"
            >
              <img
                :src="photo.src"
                :alt="loop === 0 ? photo.alt : ''"
                :style="{ objectPosition: photo.position }"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.music-video-section {
  overflow: hidden;
  background: radial-gradient(circle at 12% 8%, rgba(241, 215, 141, 0.1), transparent 20rem),
    linear-gradient(180deg, var(--color-charcoal), var(--color-ink));
}

.music-video-section__intro {
  display: grid;
  grid-template-columns: minmax(0, 0.64fr) minmax(280px, 0.36fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: end;
}

h2 {
  max-width: 780px;
  margin: 0;
  color: var(--color-warm-white);
  font-family: var(--font-display);
  font-size: clamp(2.35rem, 5vw, 5.4rem);
  font-weight: 800;
  line-height: 0.9;
}

.music-video-section__intro .section-copy {
  margin: 0;
}

.music-video-section__rail {
  --gallery-gap: clamp(0.72rem, 2vw, 1.1rem);

  margin-top: clamp(2rem, 5vw, 4.5rem);
  overflow: hidden;
  outline-offset: 8px;
  mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
}

.music-video-section__track {
  display: flex;
  width: max-content;
  animation: musicVideoHorizontal 42s linear infinite;
  will-change: transform;
}

.music-video-section__group {
  display: flex;
  gap: var(--gallery-gap);
  padding-right: var(--gallery-gap);
}

.music-video-section__frame {
  flex: 0 0 clamp(320px, 30vw, 480px);
  height: clamp(360px, 34vw, 520px);
  margin: 0;
  overflow: hidden;
  background: #050403;
}

.music-video-section__frame img {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
  filter: var(--photo-grade);
  object-fit: cover;
  transition:
    filter 520ms var(--ease-out),
    transform 520ms var(--ease-out);
}

.music-video-section__frame:hover img {
  filter: var(--photo-grade-hover);
  transform: scale(1.035);
}

.music-video-section__rail:hover .music-video-section__track,
.music-video-section__rail:focus-within .music-video-section__track {
  animation-play-state: paused;
}

@keyframes musicVideoHorizontal {
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 760px) {
  .music-video-section__intro {
    grid-template-columns: 1fr;
  }

  .music-video-section__rail {
    padding-bottom: 0.7rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
    scroll-snap-type: x proximity;
    scrollbar-color: rgba(241, 215, 141, 0.42) rgba(246, 239, 225, 0.08);
  }

  .music-video-section__track {
    display: flex;
    width: max-content;
    animation-name: musicVideoHorizontal;
    animation-duration: 34s;
  }

  .music-video-section__group {
    display: flex;
    gap: var(--gallery-gap);
    padding-right: var(--gallery-gap);
  }

  .music-video-section__frame {
    flex: 0 0 min(82vw, 360px);
    height: min(104vw, 470px);
    scroll-snap-align: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .music-video-section__rail {
    overflow: auto;
    mask-image: none;
  }

  .music-video-section__track {
    width: auto;
    animation: none;
    transform: none;
  }
}
</style>
