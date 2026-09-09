<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import studioBassImage from '@/assets/images/studio-bass-detail.jpg'
import studioDrumImage from '@/assets/images/studio-drum-room.jpg'
import studioMainImage from '@/assets/images/studio-ferchio-session.jpg'
import studioHeadphonesImage from '@/assets/images/studio-headphones-detail.jpg'

const highlights = [
  'Dokumentationen',
  'Musikproduktionen',
  'Markenfilme',
  'Künstlerbegleitung',
  'Musik für Bild',
]

const stats = [
  { value: '01', label: 'Zuhören, bevor Technik ins Spiel kommt' },
  { value: '02', label: 'Vertrauen als Grundlage jeder Produktion' },
  { value: '03', label: 'Inszenierung, die authentisch bleibt' },
]

const studioGallery = [
  {
    src: studioHeadphonesImage,
    alt: 'Kopfhörer und Mikrofon im Aufnahmeraum',
    label: 'Monitoring',
    position: 'center 50%',
  },
  {
    src: studioDrumImage,
    alt: 'Schlagzeug, Mikrofone und Keyboard im Studio',
    label: 'Recording Room',
    position: 'center 44%',
  },
  {
    src: studioBassImage,
    alt: 'Bassgitarre während einer Aufnahme im Studio',
    label: 'Instrumente',
    position: 'center 50%',
  },
]
</script>

<template>
  <section id="studio" class="section studio-section">
    <div class="grid-ambient"></div>
    <div class="container studio-section__grid">
      <div class="studio-section__copy">
        <SectionHeading
          eyebrow="About Sherpa East Studio"
          title="Beyond the Ordinary"
          copy="Sherpa East entstand aus der Überzeugung, dass jede Geschichte eine authentische und hochwertige Inszenierung verdient - ob von einem Künstler, einem Unternehmen oder einem Menschen."
        />
        <blockquote data-reveal>
          Für uns beginnt gute Arbeit nicht mit einer Kamera oder einem Mikrofon. Sie beginnt mit
          Zuhören. Mit Vertrauen.
        </blockquote>
        <p class="studio-section__body" data-reveal>
          Wir kennen die Bühne, das Sprechen vor der Kamera und die Verantwortung hinter der Kamera.
          Diese Perspektiven prägen jede Produktion: Arbeiten, die Menschen berühren, Künstler
          repräsentieren und Unternehmen eine Identität geben.
        </p>
        <div class="studio-section__tags" data-reveal>
          <span v-for="highlight in highlights" :key="highlight">{{ highlight }}</span>
        </div>
      </div>

      <div class="studio-section__media" data-reveal>
        <div
          class="studio-section__image studio-section__image--main"
          :style="{ '--about-image': `url(${studioMainImage})` }"
          role="img"
          aria-label="Ferchio arbeitet im Studio an einer Musikproduktion"
        ></div>
      </div>

      <div class="studio-section__gallery" data-reveal>
        <figure
          v-for="photo in studioGallery"
          :key="photo.src"
          class="studio-section__gallery-item"
        >
          <img :src="photo.src" :alt="photo.alt" :style="{ objectPosition: photo.position }" />
          <figcaption>{{ photo.label }}</figcaption>
        </figure>
      </div>

      <dl class="studio-section__stats" data-reveal>
        <div v-for="stat in stats" :key="stat.label">
          <dt>{{ stat.value }}</dt>
          <dd>{{ stat.label }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.studio-section {
  background: linear-gradient(
    180deg,
    var(--color-ink),
    var(--color-charcoal) 55%,
    var(--color-ink)
  );
}

.studio-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 1.05fr);
  gap: clamp(2rem, 6vw, 5.5rem);
  align-items: center;
}

blockquote {
  max-width: 620px;
  margin: 2rem 0 0;
  padding-left: 1.2rem;
  color: var(--color-beige);
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 3vw, 2.25rem);
  line-height: 1.08;
  border-left: 1px solid var(--color-gold);
}

.studio-section__body {
  max-width: 680px;
  margin: 1.35rem 0 0;
  color: var(--color-muted);
  font-size: clamp(1rem, 1.35vw, 1.12rem);
}

.studio-section__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 2rem;
}

.studio-section__tags span {
  padding: 0.54rem 0.72rem;
  color: var(--color-muted);
  font-size: 0.82rem;
  border: 1px solid rgba(246, 239, 225, 0.1);
  border-radius: var(--radius-sm);
  background: rgba(246, 239, 225, 0.04);
}

.studio-section__media {
  position: relative;
  min-height: 560px;
}

.studio-section__image {
  position: absolute;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  box-shadow: var(--shadow-soft);
}

.studio-section__image::before {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(120deg, rgba(246, 239, 225, 0.08), transparent 35%),
    radial-gradient(circle at 70% 22%, rgba(215, 181, 109, 0.18), transparent 17rem),
    repeating-linear-gradient(90deg, rgba(246, 239, 225, 0.07) 0 1px, transparent 1px 32px),
    linear-gradient(145deg, #191613, #080706);
}

.studio-section__image::after {
  position: absolute;
  inset: 18%;
  content: '';
  border-top: 1px solid rgba(215, 181, 109, 0.42);
  border-bottom: 1px solid rgba(215, 181, 109, 0.22);
  transform: skewY(-9deg);
}

.studio-section__image--main {
  inset: 0;
  background:
    linear-gradient(180deg, rgba(5, 4, 3, 0.02), rgba(5, 4, 3, 0.52)),
    linear-gradient(120deg, rgba(241, 215, 141, 0.16), transparent 34%),
    var(--about-image) center / cover;
  background-position: center 42%;
  filter: var(--photo-grade);
}

.studio-section__image--main::before {
  background: linear-gradient(120deg, rgba(246, 239, 225, 0.08), transparent 35%),
    radial-gradient(circle at 68% 28%, rgba(215, 181, 109, 0.1), transparent 15rem);
  mix-blend-mode: screen;
}

.studio-section__image--main::after {
  inset: 0;
  border: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(5, 4, 3, 0.68));
  transform: none;
}

.studio-section__gallery {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: rgba(246, 239, 225, 0.08);
}

.studio-section__gallery-item {
  position: relative;
  min-height: clamp(230px, 24vw, 360px);
  margin: 0;
  overflow: hidden;
  background: #050403;
}

.studio-section__gallery-item img {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
  filter: var(--photo-grade);
  object-fit: cover;
  transition:
    filter 620ms var(--ease-out),
    transform 620ms var(--ease-out);
}

.studio-section__gallery-item::after {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(180deg, rgba(5, 4, 3, 0.02), rgba(5, 4, 3, 0.62));
}

.studio-section__gallery-item:hover img {
  filter: var(--photo-grade-hover);
  transform: scale(1.035);
}

.studio-section__gallery-item figcaption {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 1;
  color: var(--color-gold-bright);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.studio-section__stats {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin: 0;
  border: 1px solid rgba(246, 239, 225, 0.09);
  background: rgba(246, 239, 225, 0.08);
}

.studio-section__stats div {
  padding: clamp(1.1rem, 3vw, 2rem);
  background: rgba(5, 4, 3, 0.74);
}

dt {
  color: var(--color-gold-bright);
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4.8rem);
  line-height: 1;
}

dd {
  margin: 0.45rem 0 0;
  color: var(--color-muted);
}

@media (max-width: 900px) {
  .studio-section__grid,
  .studio-section__stats {
    grid-template-columns: 1fr;
  }

  .studio-section__media {
    min-height: 420px;
  }

  .studio-section__image--main {
    inset: 0;
  }

  .studio-section__gallery {
    grid-template-columns: 1fr;
  }

  .studio-section__gallery-item {
    min-height: 310px;
  }
}
</style>
