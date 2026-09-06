<script setup lang="ts">
import { testimonials } from '@/data/testimonials'
import SectionHeading from '@/components/ui/SectionHeading.vue'
</script>

<template>
  <section id="stimmen" class="section testimonials-section">
    <div class="container">
      <SectionHeading
        eyebrow="Erfahrungsberichte"
        title="Zusammenarbeit, die Vertrauen hörbar macht"
        copy="Projektpartner beschreiben Sherpa East als aufmerksame, ehrliche und kreative Begleitung - von Lesungen bis zur Albumproduktion."
      />

      <div class="testimonials-section__grid">
        <article
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="testimonial-card"
          data-reveal
        >
          <p>{{ testimonial.quote }}</p>
          <footer>
            <strong>{{ testimonial.name }}</strong>
            <span>{{ testimonial.role }}</span>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  background: radial-gradient(circle at 75% 12%, rgba(215, 181, 109, 0.12), transparent 23rem),
    linear-gradient(180deg, var(--color-ink), var(--color-charcoal));
}

.testimonials-section__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: clamp(2.2rem, 5vw, 4.5rem);
}

.testimonial-card {
  display: grid;
  min-height: 320px;
  align-content: space-between;
  gap: 2rem;
  padding: clamp(1.1rem, 3vw, 1.8rem);
  border: 1px solid rgba(246, 239, 225, 0.1);
  border-radius: var(--radius-md);
  background: linear-gradient(180deg, rgba(246, 239, 225, 0.06), rgba(246, 239, 225, 0.025));
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.18);
}

.testimonial-card p {
  margin: 0;
  color: var(--color-beige);
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.3vw, 2rem);
  font-weight: 700;
  line-height: 1.08;
}

.testimonial-card footer {
  display: grid;
  gap: 0.24rem;
}

.testimonial-card strong {
  color: var(--color-gold-bright);
  font-size: 0.78rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.testimonial-card span {
  color: var(--color-muted);
}

@media (max-width: 920px) {
  .testimonials-section__grid {
    grid-template-columns: 1fr;
  }

  .testimonial-card {
    min-height: 240px;
  }
}
</style>
