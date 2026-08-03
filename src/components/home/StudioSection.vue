<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'

const highlights = [
  'Professionelle Aufnahme',
  'Musikproduktion',
  'Mixing und Mastering',
  'Live Sessions',
  'Komposition und Arrangements',
]

const stats = [
  { value: '05', label: 'Räume und kreative Stationen' },
  { value: '24b', label: 'Workflow für hochauflösende Produktionen' },
  { value: '01', label: 'Team rund um jedes Projekt' },
]
</script>

<template>
  <section id="studio" class="section studio-section">
    <div class="grid-ambient"></div>
    <div class="container studio-section__grid">
      <div class="studio-section__copy">
        <SectionHeading
          eyebrow="Das Studio"
          title="Der Ort, an dem Ideen Form annehmen"
          copy="Sherpa East Studio ist ein Raum für Intuitionen, Demos und Performances, die zu eigenständigen Produktionen werden. Wir arbeiten wie ein Expeditionsteam: hörend, fordernd und aufmerksam in jeder Etappe."
        />
        <blockquote data-reveal>
          Die Philosophie ist einfach: weniger Lärm um den Künstler, mehr Charakter in der Musik.
        </blockquote>
        <div class="studio-section__tags" data-reveal>
          <span v-for="highlight in highlights" :key="highlight">{{ highlight }}</span>
        </div>
      </div>

      <div class="studio-section__media" data-reveal>
        <div
          class="studio-section__image studio-section__image--main"
          role="img"
          aria-label="Dunkler Studioraum mit analoger Konsole und warmem Licht"
        ></div>
        <div
          class="studio-section__image studio-section__image--side"
          role="img"
          aria-label="Abstrakte Bergform aus topografischen Linien"
        ></div>
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
  border: 1px solid rgba(215, 181, 109, 0.22);
  border-radius: var(--radius-md);
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
  inset: 0 0 70px 70px;
}

.studio-section__image--side {
  inset: auto 46% 0 0;
  height: 250px;
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
    inset: 0 0 60px 20px;
  }

  .studio-section__image--side {
    inset: auto 28% 0 0;
  }
}
</style>
