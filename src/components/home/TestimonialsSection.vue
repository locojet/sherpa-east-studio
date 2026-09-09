<script setup lang="ts">
import { testimonials } from '@/data/testimonials'
import bernhardImage from '@/assets/images/bernhard-portrait.jpg'
import martineImage from '@/assets/images/martine-seibert-raken.webp'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const testimonialImages: Record<string, { src: string; position: string }> = {
  bernhard: {
    src: bernhardImage,
    position: 'center 34%',
  },
  'martine-seibert-raken': {
    src: martineImage,
    position: 'center 24%',
  },
}

function getTestimonialImageStyle(testimonialId: string) {
  const image = testimonialImages[testimonialId]

  if (!image) {
    return undefined
  }

  return {
    '--testimonial-image': `url(${image.src})`,
    '--testimonial-position': image.position,
  }
}
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
          :class="{
            'testimonial-card--with-photo': Boolean(getTestimonialImageStyle(testimonial.id)),
          }"
          data-reveal
        >
          <div
            v-if="getTestimonialImageStyle(testimonial.id)"
            class="testimonial-card__image"
            :style="getTestimonialImageStyle(testimonial.id)"
            aria-hidden="true"
          ></div>
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

.testimonial-card--with-photo {
  gap: 0;
  align-content: start;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 0;
}

.testimonial-card__image {
  min-height: 260px;
  background: var(--testimonial-image) var(--testimonial-position) / cover;
  filter: var(--photo-grade);
}

.testimonial-card--with-photo p,
.testimonial-card--with-photo footer {
  padding-inline: clamp(1.1rem, 3vw, 1.8rem);
}

.testimonial-card--with-photo p {
  padding-top: clamp(1.1rem, 3vw, 1.8rem);
}

.testimonial-card--with-photo footer {
  padding-bottom: clamp(1.1rem, 3vw, 1.8rem);
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
