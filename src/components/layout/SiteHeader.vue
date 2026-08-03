<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { navigationItems } from '@/data/navigation'
import { useUiStore } from '@/stores/ui'
import BrandLogo from '@/components/ui/BrandLogo.vue'

const ui = useUiStore()

function handleScroll() {
  ui.setHeaderCompact(window.scrollY > 32)
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})

watch(
  () => ui.isMenuOpen,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
)
</script>

<template>
  <header
    class="site-header"
    :class="{
      'site-header--compact': ui.isHeaderCompact,
      'site-header--menu-open': ui.isMenuOpen,
    }"
  >
    <RouterLink
      class="site-header__logo"
      :to="{ path: '/', hash: '#inicio' }"
      aria-label="Zum Start"
    >
      <BrandLogo compact text-only :show-studio="false" />
    </RouterLink>

    <RouterLink
      class="site-header__mobile-mark"
      :to="{ path: '/', hash: '#inicio' }"
      aria-label="Zum Start"
      @click="ui.closeMenu"
    >
      <BrandLogo compact mark-only />
    </RouterLink>

    <RouterLink
      class="site-header__mobile-wordmark"
      :to="{ path: '/', hash: '#inicio' }"
      aria-label="Zum Start"
      @click="ui.closeMenu"
    >
      <BrandLogo compact text-only :show-studio="false" />
    </RouterLink>

    <nav class="site-header__nav" aria-label="Hauptnavigation">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.hash"
        :to="{ path: '/', hash: item.hash }"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <button
      class="site-header__menu-button"
      type="button"
      :aria-label="ui.menuLabel"
      :aria-expanded="ui.isMenuOpen"
      aria-controls="mobile-menu"
      @click="ui.toggleMenu"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  </header>

  <div
    id="mobile-menu"
    class="mobile-menu"
    :class="{ 'mobile-menu--open': ui.isMenuOpen }"
    :aria-hidden="!ui.isMenuOpen"
  >
    <div class="mobile-menu__inner">
      <nav aria-label="Mobile Navigation">
        <RouterLink
          v-for="(item, index) in navigationItems"
          :key="item.hash"
          :to="{ path: '/', hash: item.hash }"
          :style="{ '--menu-item-delay': `${120 + index * 76}ms` }"
          @click="ui.closeMenu"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 18px 20px auto;
  z-index: 40;
  display: grid;
  min-height: 64px;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  width: min(1180px, calc(100vw - 40px));
  margin: 0 auto;
  padding: 0.72rem 0.82rem 0.72rem 1rem;
  border: 1px solid rgba(246, 239, 225, 0.11);
  border-radius: var(--radius-md);
  background: rgba(5, 4, 3, 0.38);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(20px);
  transition:
    min-height 260ms var(--ease-out),
    background 260ms var(--ease-out),
    border-color 260ms var(--ease-out);
}

.site-header--compact {
  min-height: 54px;
  border-color: rgba(215, 181, 109, 0.22);
  background: rgba(5, 4, 3, 0.78);
}

.site-header__logo {
  min-width: 0;
}

.site-header__mobile-mark,
.site-header__mobile-wordmark {
  display: none;
}

.site-header__nav {
  display: flex;
  justify-content: center;
  gap: clamp(0.7rem, 2.2vw, 1.65rem);
}

.site-header__nav a {
  position: relative;
  color: var(--color-muted);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  transition: color 220ms ease;
}

.site-header__nav a::after {
  position: absolute;
  right: 0;
  bottom: -8px;
  left: 0;
  height: 1px;
  content: '';
  background: var(--color-gold-bright);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 260ms var(--ease-out);
}

.site-header__nav a:hover,
.site-header__nav a:focus-visible {
  color: var(--color-warm-white);
}

.site-header__nav a:hover::after,
.site-header__nav a:focus-visible::after {
  transform: scaleX(1);
}

.site-header__menu-button {
  display: none;
  width: 44px;
  height: 44px;
  place-items: center;
  background: rgba(246, 239, 225, 0.08);
  border: 1px solid rgba(246, 239, 225, 0.12);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    background 220ms var(--ease-out),
    border-color 220ms var(--ease-out),
    box-shadow 220ms var(--ease-out);
}

.site-header__menu-button span {
  grid-area: 1 / 1;
  width: 18px;
  height: 2px;
  background: var(--color-gold-bright);
  border-radius: 999px;
  transform-origin: center;
  transition:
    background 220ms var(--ease-out),
    transform 260ms var(--ease-out);
}

.site-header__menu-button span:first-child {
  transform: translateY(-4px);
}

.site-header__menu-button span:last-child {
  transform: translateY(4px);
}

.site-header--menu-open .site-header__menu-button {
  border-color: rgba(241, 215, 141, 0.42);
  background: rgba(241, 215, 141, 0.12);
  box-shadow: 0 0 24px rgba(215, 181, 109, 0.18);
}

.site-header--menu-open .site-header__menu-button span:first-child {
  transform: translateY(0) rotate(45deg);
}

.site-header--menu-open .site-header__menu-button span:last-child {
  transform: translateY(0) rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 35;
  display: none;
  pointer-events: none;
  background: radial-gradient(circle at 28% 20%, rgba(215, 181, 109, 0.14), transparent 30rem),
    rgba(5, 4, 3, 0.96);
  opacity: 0;
  perspective: 900px;
  transition: opacity 260ms var(--ease-out);
}

.mobile-menu__inner {
  display: grid;
  width: min(460px, calc(100vw - 40px));
  min-height: 100%;
  align-content: center;
  gap: 3rem;
  margin: 0 auto;
  transform: translateY(-18px);
  transition: transform 460ms var(--ease-out);
}

.mobile-menu nav {
  display: grid;
  gap: 1rem;
  perspective: 900px;
}

.mobile-menu a {
  padding: 0.2rem 0;
  color: var(--color-warm-white);
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 12vw, 4.8rem);
  line-height: 0.92;
  opacity: 0;
  transform: translate3d(0, -86px, 0) rotateX(-72deg) rotateZ(-7deg);
  transform-origin: center top;
  transition:
    opacity 340ms ease,
    transform 780ms cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0ms;
  will-change: opacity, transform;
}

@media (max-width: 900px) {
  .site-header {
    inset-inline: 14px;
    grid-template-columns: 96px 1fr 44px;
    width: calc(100vw - 28px);
  }

  .site-header__nav {
    display: none;
  }

  .site-header__logo {
    display: none;
  }

  .site-header__mobile-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transform: translateY(4px) scale(0.86);
    transition:
      opacity 260ms var(--ease-out),
      transform 320ms var(--ease-out);
  }

  .site-header__mobile-wordmark {
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-flex;
    max-width: calc(100vw - 210px);
    justify-content: center;
    opacity: 0;
    pointer-events: auto;
    text-align: center;
    transform: translate(-50%, -46%) scale(0.92);
    transition:
      opacity 260ms var(--ease-out),
      transform 320ms var(--ease-out);
  }

  .site-header--compact .site-header__mobile-mark,
  .site-header--menu-open .site-header__mobile-mark {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0) scale(1);
  }

  .site-header--compact .site-header__mobile-wordmark,
  .site-header--menu-open .site-header__mobile-wordmark {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
  }

  .site-header__mobile-mark :deep(.brand-logo__image) {
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.55));
  }

  .site-header__mobile-wordmark :deep(.brand-logo__fallback) {
    align-items: center;
    color: var(--color-gold-bright);
    font-family: var(--font-display);
    text-align: center;
  }

  .site-header__mobile-wordmark :deep(.brand-logo__fallback span) {
    font-size: clamp(0.78rem, 3.6vw, 1rem);
    font-weight: 800;
    letter-spacing: 0.16em;
    white-space: nowrap;
  }

  .site-header__mobile-wordmark :deep(.brand-logo__fallback small) {
    color: var(--color-muted);
    font-size: clamp(0.42rem, 1.9vw, 0.5rem);
    letter-spacing: 0.34em;
    white-space: nowrap;
  }

  .site-header__menu-button {
    display: grid;
    grid-column: 3;
    margin-left: auto;
  }

  .mobile-menu {
    display: block;
  }

  .mobile-menu--open {
    pointer-events: auto;
    opacity: 1;
  }

  .mobile-menu--open .mobile-menu__inner {
    transform: translateY(0);
  }

  .mobile-menu--open a {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg);
    transition-delay: var(--menu-item-delay);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu__inner,
  .mobile-menu a {
    transform: none;
    transition: none;
  }

  .mobile-menu a {
    opacity: 1;
  }
}
</style>
