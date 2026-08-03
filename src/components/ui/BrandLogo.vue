<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type LogoVariant = 'gold' | 'dark'

const props = withDefaults(
  defineProps<{
    variant?: LogoVariant
    compact?: boolean
    textOnly?: boolean
    markOnly?: boolean
  }>(),
  {
    variant: 'gold',
    compact: false,
    textOnly: false,
    markOnly: false,
  },
)

const logoAssets = import.meta.glob('@/assets/logos/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const imageFailed = ref(false)

const logoSrc = computed(() => {
  const target = props.markOnly
    ? 'sherpa-east-mountains-mark.png'
    : props.variant === 'dark'
      ? 'sherpa-east-logo-dark.png'
      : 'sherpa-east-logo-gold.png'

  return Object.entries(logoAssets).find(([path]) => path.endsWith(target))?.[1]
})

const altText = computed(() =>
  props.markOnly
    ? 'Sherpa East Berge Logo'
    : props.variant === 'dark'
      ? 'Sherpa East Studio Logo in Schwarz und Gold'
      : 'Sherpa East Studio Logo in Gold',
)

watch([() => props.variant, () => props.markOnly], () => {
  imageFailed.value = false
})
</script>

<template>
  <span
    class="brand-logo"
    :class="[
      `brand-logo--${variant}`,
      {
        'brand-logo--compact': compact,
        'brand-logo--text-only': textOnly,
        'brand-logo--mark-only': markOnly,
      },
    ]"
  >
    <img
      v-if="logoSrc && !imageFailed && !textOnly"
      class="brand-logo__image"
      :src="logoSrc"
      :alt="altText"
      @error="imageFailed = true"
    />
    <span v-else class="brand-logo__fallback" aria-label="Sherpa East Studio">
      <span>Sherpa East</span>
      <small>Studio</small>
    </span>
  </span>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

.brand-logo__image {
  width: auto;
  max-width: 190px;
  height: 54px;
  object-fit: contain;
}

.brand-logo__fallback {
  display: inline-grid;
  gap: 2px;
  color: var(--color-gold-bright);
  font-family: var(--font-serif);
  line-height: 0.92;
  text-transform: uppercase;
}

.brand-logo__fallback span {
  font-size: clamp(1.08rem, 2vw, 1.45rem);
  font-weight: 700;
  letter-spacing: 0.1em;
}

.brand-logo__fallback small {
  color: var(--color-muted);
  font-family: var(--font-sans);
  font-size: 0.56rem;
  font-weight: 800;
  letter-spacing: 0.36em;
}

.brand-logo--dark .brand-logo__fallback {
  color: var(--color-ink);
}

.brand-logo--dark .brand-logo__fallback small {
  color: var(--color-graphite);
}

.brand-logo--compact .brand-logo__image {
  max-width: 144px;
  height: 42px;
}

.brand-logo--compact .brand-logo__fallback span {
  font-size: 1rem;
}

.brand-logo--mark-only {
  width: clamp(82px, 22vw, 96px);
  height: 52px;
  justify-content: center;
  overflow: visible;
}

.brand-logo--mark-only .brand-logo__image {
  width: 100%;
  max-width: none;
  height: 100%;
  object-fit: contain;
  clip-path: none;
  transform: none;
}

@media (max-width: 520px) {
  .brand-logo__image {
    max-width: 148px;
    height: 42px;
  }

  .brand-logo--mark-only .brand-logo__image {
    width: 100%;
    max-width: none;
    height: 100%;
  }
}
</style>
