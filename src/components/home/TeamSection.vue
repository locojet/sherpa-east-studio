<script setup lang="ts">
import { team } from '@/data/team'
import SectionHeading from '@/components/ui/SectionHeading.vue'
</script>

<template>
  <section id="equipo" class="section team-section">
    <div class="container">
      <SectionHeading
        eyebrow="Team"
        title="Menschen, die zuhören, bevor sie den Fader bewegen"
        copy="Provisorische Profile für das spätere Studioteam mit Foto, Rolle, Kurzbiografie und optionalen Kanälen."
      />

      <div class="team-section__grid">
        <article v-for="member in team" :key="member.id" class="team-card" data-reveal>
          <div class="team-card__portrait" :aria-label="member.imageAlt" role="img"></div>
          <div>
            <p>{{ member.role }}</p>
            <h3>{{ member.name }}</h3>
            <span v-if="member.social">{{ member.social }}</span>
          </div>
          <small>{{ member.bio }}</small>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  background: var(--color-ink);
}

.team-section__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: clamp(2.2rem, 5vw, 4.5rem);
}

.team-card {
  display: grid;
  gap: 1.2rem;
  padding: 1rem;
  border: 1px solid rgba(246, 239, 225, 0.1);
  border-radius: var(--radius-md);
  background: rgba(246, 239, 225, 0.04);
}

.team-card__portrait {
  min-height: 340px;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: radial-gradient(circle at 50% 24%, rgba(215, 181, 109, 0.22), transparent 11rem),
    linear-gradient(160deg, rgba(246, 239, 225, 0.12), transparent 38%),
    repeating-linear-gradient(90deg, rgba(246, 239, 225, 0.06) 0 1px, transparent 1px 28px),
    linear-gradient(150deg, #29231c, #080706);
}

.team-card:nth-child(2) .team-card__portrait {
  background: radial-gradient(circle at 42% 24%, rgba(238, 224, 194, 0.2), transparent 11rem),
    linear-gradient(160deg, rgba(246, 239, 225, 0.11), transparent 38%),
    repeating-linear-gradient(0deg, rgba(246, 239, 225, 0.05) 0 1px, transparent 1px 26px),
    linear-gradient(150deg, #231f1b, #080706);
}

.team-card:nth-child(3) .team-card__portrait {
  background: radial-gradient(circle at 58% 22%, rgba(215, 181, 109, 0.18), transparent 12rem),
    linear-gradient(160deg, rgba(246, 239, 225, 0.1), transparent 38%),
    repeating-linear-gradient(115deg, rgba(246, 239, 225, 0.06) 0 1px, transparent 1px 26px),
    linear-gradient(150deg, #201c18, #070605);
}

p,
small,
span {
  margin: 0;
  color: var(--color-muted);
}

p,
span {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h3 {
  margin: 0.3rem 0;
  color: var(--color-warm-white);
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 3vw, 2.8rem);
  line-height: 1;
}

@media (max-width: 900px) {
  .team-section__grid {
    grid-template-columns: 1fr;
  }

  .team-card__portrait {
    min-height: 260px;
  }
}
</style>
