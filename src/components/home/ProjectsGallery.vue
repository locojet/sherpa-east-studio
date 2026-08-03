<script setup lang="ts">
import { computed, ref } from 'vue'
import { projects } from '@/data/projects'
import { tracks } from '@/data/tracks'
import type { ProjectItem } from '@/types/content'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const activeProject = ref<ProjectItem | null>(null)

const activeTrack = computed(() =>
  activeProject.value?.trackId
    ? tracks.find((track) => track.id === activeProject.value?.trackId)
    : undefined,
)
</script>

<template>
  <section id="proyectos" class="section projects-section">
    <div class="container">
      <SectionHeading
        eyebrow="Projekte"
        title="Ausgewählte Arbeiten mit eigener Textur"
        copy="Provisorische Inhalte, sauber vom visuellen Code getrennt. Jedes Projekt kann Audio, Bild, Studioleistung und eine Detailansicht verbinden."
      />

      <div class="projects-section__grid">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-card"
          data-reveal
          :style="{ '--project-accent': project.accent }"
        >
          <div class="project-card__image" :aria-label="project.imageAlt" role="img"></div>
          <div class="project-card__content">
            <span>{{ project.year }} / {{ project.work }}</span>
            <h3>{{ project.title }}</h3>
            <p>{{ project.artist }}</p>
            <button type="button" @click="activeProject = project">Details ansehen</button>
          </div>
        </article>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="activeProject"
        class="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <button
          class="project-modal__backdrop"
          type="button"
          aria-label="Projekt schließen"
          @click="activeProject = null"
        ></button>
        <article class="project-modal__panel">
          <button
            class="project-modal__close"
            type="button"
            aria-label="Schließen"
            @click="activeProject = null"
          >
            Schließen
          </button>
          <span>{{ activeProject.year }} / {{ activeProject.work }}</span>
          <h3 id="project-modal-title">{{ activeProject.title }}</h3>
          <p class="project-modal__artist">{{ activeProject.artist }}</p>
          <p>{{ activeProject.description }}</p>
          <div v-if="activeTrack" class="project-modal__audio">
            <strong>Ausschnitt verfügbar</strong>
            <span>{{ activeTrack.title }} - {{ activeTrack.artist }}</span>
          </div>
        </article>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.projects-section {
  background: radial-gradient(circle at 80% 8%, rgba(238, 224, 194, 0.08), transparent 22rem),
    var(--color-charcoal);
}

.projects-section__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  grid-auto-rows: minmax(360px, auto);
  gap: 1rem;
  margin-top: clamp(2.2rem, 5vw, 4.5rem);
}

.project-card {
  position: relative;
  display: grid;
  min-height: 360px;
  overflow: hidden;
  border: 1px solid rgba(246, 239, 225, 0.1);
  border-radius: var(--radius-md);
  background: #0a0908;
}

.project-card:first-child {
  grid-row: span 2;
}

.project-card__image {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 70% 22%,
      color-mix(in srgb, var(--project-accent), transparent 72%),
      transparent 17rem
    ),
    linear-gradient(135deg, rgba(246, 239, 225, 0.1), transparent 34%),
    repeating-linear-gradient(115deg, rgba(246, 239, 225, 0.06) 0 1px, transparent 1px 18px),
    linear-gradient(150deg, #2a251f, #060504);
  transition: transform 520ms var(--ease-out);
}

.project-card__image::after {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(180deg, rgba(5, 4, 3, 0.08), rgba(5, 4, 3, 0.84));
}

.project-card:hover .project-card__image {
  transform: scale(1.04);
}

.project-card__content {
  position: relative;
  z-index: 1;
  display: grid;
  align-content: end;
  padding: clamp(1.1rem, 3vw, 2rem);
}

.project-card span,
.project-modal span {
  color: var(--color-gold-bright);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h3 {
  margin: 0.7rem 0 0;
  color: var(--color-warm-white);
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 4vw, 4.4rem);
  line-height: 0.92;
}

.project-card p {
  margin: 0.35rem 0 1.3rem;
  color: var(--color-muted);
}

button {
  width: max-content;
  min-height: 42px;
  padding: 0.65rem 0.78rem;
  color: var(--color-warm-white);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  border: 1px solid rgba(215, 181, 109, 0.28);
  border-radius: var(--radius-sm);
  background: rgba(5, 4, 3, 0.48);
  cursor: pointer;
}

.project-modal {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 20px;
}

.project-modal__backdrop {
  position: absolute;
  inset: 0;
  width: auto;
  background: rgba(5, 4, 3, 0.76);
  backdrop-filter: blur(12px);
}

.project-modal__panel {
  position: relative;
  z-index: 1;
  width: min(680px, 100%);
  padding: clamp(1.3rem, 5vw, 3rem);
  border: 1px solid rgba(215, 181, 109, 0.25);
  border-radius: var(--radius-md);
  background: radial-gradient(circle at 100% 0, rgba(215, 181, 109, 0.16), transparent 18rem),
    var(--color-charcoal);
  box-shadow: var(--shadow-soft);
}

.project-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.project-modal p {
  color: var(--color-muted);
}

.project-modal__artist {
  margin-top: 0.4rem;
  color: var(--color-beige) !important;
}

.project-modal__audio {
  display: grid;
  gap: 0.25rem;
  margin-top: 1.6rem;
  padding: 1rem;
  border: 1px solid rgba(246, 239, 225, 0.1);
  border-radius: var(--radius-sm);
  background: rgba(246, 239, 225, 0.04);
}

@media (max-width: 840px) {
  .projects-section__grid {
    grid-template-columns: 1fr;
  }

  .project-card:first-child {
    grid-row: auto;
  }
}
</style>
