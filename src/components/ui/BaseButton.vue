<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    type?: 'button' | 'submit'
  }>(),
  {
    variant: 'primary',
    type: 'button',
  },
)
</script>

<template>
  <RouterLink v-if="props.to" class="base-button" :class="`base-button--${variant}`" :to="props.to">
    <slot />
  </RouterLink>
  <a
    v-else-if="props.href"
    class="base-button"
    :class="`base-button--${variant}`"
    :href="props.href"
  >
    <slot />
  </a>
  <button v-else class="base-button" :class="`base-button--${variant}`" :type="type">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  position: relative;
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  overflow: hidden;
  color: var(--color-warm-white);
  font-size: 0.78rem;
  font-weight: 800;
  gap: 0.55rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    transform 260ms var(--ease-out),
    border-color 260ms var(--ease-out),
    background 260ms var(--ease-out),
    color 260ms var(--ease-out);
}

.base-button::after {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: '';
  background: linear-gradient(110deg, transparent, rgba(255, 255, 255, 0.16), transparent);
  transform: translateX(-120%);
  transition: transform 520ms var(--ease-out);
}

.base-button:hover {
  transform: translateY(-2px);
}

.base-button:hover::after {
  transform: translateX(120%);
}

.base-button--primary {
  color: #17120a;
  background: linear-gradient(135deg, var(--color-gold-bright), var(--color-gold));
  box-shadow: 0 18px 46px rgba(215, 181, 109, 0.18);
}

.base-button--secondary {
  background: rgba(246, 239, 225, 0.08);
  backdrop-filter: blur(18px);
}

.base-button--ghost {
  color: var(--color-gold-bright);
  background: transparent;
}

@media (max-width: 520px) {
  .base-button {
    width: 100%;
  }
}
</style>
