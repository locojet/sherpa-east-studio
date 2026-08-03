<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { services } from '@/data/services'
import SectionHeading from '@/components/ui/SectionHeading.vue'
</script>

<template>
  <section id="servicios" class="section services-section">
    <div class="container">
      <SectionHeading
        eyebrow="Leistungen"
        title="Eine komplette Kette für Klang mit Charakter"
        copy="Jedes Angebot ist ein Ausgangspunkt. Der tatsächliche Ablauf richtet sich nach Künstler, Zeitrahmen und der Energie, die ein Projekt braucht."
      />

      <div class="services-section__grid">
        <article
          v-for="(service, index) in services"
          :key="service.id"
          class="service-card"
          data-reveal
        >
          <span class="service-card__number">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="service-card__icon" aria-hidden="true">{{ service.icon }}</div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <small>{{ service.detail }}</small>
          <RouterLink :to="{ path: '/', hash: '#contacto' }" aria-label="Leistung anfragen">
            Anfragen
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  background: radial-gradient(circle at 12% 20%, rgba(215, 181, 109, 0.08), transparent 22rem),
    var(--color-ink);
}

.services-section__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  margin-top: clamp(2.2rem, 5vw, 4.5rem);
  background: rgba(215, 181, 109, 0.16);
  border: 1px solid rgba(215, 181, 109, 0.15);
}

.service-card {
  position: relative;
  display: grid;
  min-height: 342px;
  align-content: start;
  gap: 1rem;
  padding: clamp(1.1rem, 2vw, 1.6rem);
  overflow: hidden;
  background: linear-gradient(180deg, rgba(246, 239, 225, 0.055), rgba(246, 239, 225, 0.02)),
    rgba(10, 9, 8, 0.94);
  transition:
    transform 260ms var(--ease-out),
    background 260ms var(--ease-out);
}

.service-card::before {
  position: absolute;
  inset: auto 0 0;
  height: 4px;
  content: '';
  background: var(--color-gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 320ms var(--ease-out);
}

.service-card:hover {
  z-index: 1;
  transform: translateY(-6px);
  background: radial-gradient(circle at 80% 12%, rgba(215, 181, 109, 0.14), transparent 12rem),
    rgba(14, 13, 11, 0.98);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card__number {
  color: rgba(246, 239, 225, 0.18);
  font-family: var(--font-display);
  font-size: 3rem;
  line-height: 0.8;
}

.service-card__icon {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  color: var(--color-ink);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-gold-bright), var(--color-gold));
}

h3 {
  margin: 0;
  color: var(--color-warm-white);
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2.4vw, 2.2rem);
  line-height: 1;
}

p,
small {
  margin: 0;
  color: var(--color-muted);
}

small {
  font-size: 0.86rem;
}

a {
  align-self: end;
  width: max-content;
  margin-top: 0.6rem;
  color: var(--color-gold-bright);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (max-width: 1020px) {
  .services-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .services-section__grid {
    grid-template-columns: 1fr;
  }

  .service-card {
    min-height: 290px;
  }
}
</style>
