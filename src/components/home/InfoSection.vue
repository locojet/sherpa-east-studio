<script setup lang="ts">
import { faqItems, termsItems } from '@/data/legal'
import { newsItems } from '@/data/news'
import { contactInfo } from '@/data/contact'
import SectionHeading from '@/components/ui/SectionHeading.vue'
</script>

<template>
  <section id="news" class="section info-section">
    <div class="container">
      <SectionHeading
        eyebrow="News / FAQ / Rechtliches"
        title="Alles Wichtige an einem Ort"
        copy="Aktuelle Hinweise, häufige Fragen und die wichtigsten Rahmenbedingungen für die Zusammenarbeit mit Sherpa East."
      />

      <div class="info-section__grid">
        <article class="info-panel info-panel--news" data-reveal>
          <p class="eyebrow">News</p>
          <div class="news-list">
            <section v-for="item in newsItems" :key="item.id">
              <span>{{ item.kicker }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.copy }}</p>
            </section>
          </div>
        </article>

        <article id="faq" class="info-panel" data-reveal>
          <p class="eyebrow">FAQ</p>
          <section v-for="item in faqItems" :key="item.id" class="legal-group">
            <h3>{{ item.title }}</h3>
            <ul>
              <li v-for="point in item.points" :key="point">{{ point }}</li>
            </ul>
          </section>
        </article>

        <article id="agb" class="info-panel" data-reveal>
          <p class="eyebrow">AGB-Auszug</p>
          <section v-for="item in termsItems" :key="item.id" class="legal-group">
            <h3>{{ item.title }}</h3>
            <ul>
              <li v-for="point in item.points" :key="point">{{ point }}</li>
            </ul>
          </section>
        </article>
      </div>

      <address id="impressum" class="imprint" data-reveal>
        <span>Impressum</span>
        <strong>Sherpa East Studio</strong>
        <p>{{ contactInfo.address }}</p>
        <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
      </address>
    </div>
  </section>
</template>

<style scoped>
.info-section {
  background: linear-gradient(180deg, var(--color-charcoal), var(--color-ink));
}

.info-section__grid {
  display: grid;
  grid-template-columns: 1.05fr repeat(2, minmax(0, 0.95fr));
  gap: 1rem;
  margin-top: clamp(2.2rem, 5vw, 4.5rem);
}

.info-panel,
.imprint {
  border: 1px solid rgba(246, 239, 225, 0.1);
  border-radius: var(--radius-md);
  background: rgba(246, 239, 225, 0.045);
}

.info-panel {
  padding: clamp(1.1rem, 3vw, 1.7rem);
}

.info-panel--news {
  background: radial-gradient(circle at 20% 0%, rgba(215, 181, 109, 0.14), transparent 18rem),
    rgba(246, 239, 225, 0.045);
}

.news-list,
.legal-group {
  display: grid;
  gap: 0.68rem;
}

.news-list {
  gap: 1.2rem;
}

.news-list section,
.legal-group {
  padding-top: 1rem;
  border-top: 1px solid rgba(246, 239, 225, 0.08);
}

.news-list span {
  color: var(--color-gold-bright);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

h3 {
  margin: 0;
  color: var(--color-warm-white);
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2vw, 1.8rem);
  line-height: 1.02;
}

p,
li,
.imprint {
  color: var(--color-muted);
}

p {
  margin: 0;
}

ul {
  display: grid;
  gap: 0.46rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  position: relative;
  padding-left: 1rem;
}

li::before {
  position: absolute;
  top: 0.72em;
  left: 0;
  width: 5px;
  height: 5px;
  content: '';
  border-radius: 50%;
  background: var(--color-gold-bright);
}

.imprint {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.2rem;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem clamp(1.1rem, 3vw, 1.7rem);
  font-style: normal;
}

.imprint span,
.imprint strong {
  color: var(--color-gold-bright);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.imprint a {
  color: var(--color-warm-white);
}

@media (max-width: 1080px) {
  .info-section__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .imprint {
    display: grid;
  }
}
</style>
