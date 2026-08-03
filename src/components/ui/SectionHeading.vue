<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    copy?: string
    align?: 'start' | 'center'
  }>(),
  {
    copy: '',
    align: 'start',
  },
)
</script>

<template>
  <div class="section-heading" :class="`section-heading--${align}`" data-reveal>
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="copy" class="section-heading__copy">{{ copy }}</p>
  </div>
</template>

<style scoped>
.section-heading {
  max-width: 820px;
}

.section-heading--center {
  margin-inline: auto;
  text-align: center;
}

h2 {
  margin: 0;
  color: var(--color-warm-white);
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 4.8rem);
  font-weight: 800;
  line-height: 0.98;
}

.section-heading__copy {
  margin: 18px 0 0;
  color: var(--color-muted);
  font-size: clamp(1rem, 1.45vw, 1.15rem);
}
</style>
