<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { navigationItems } from '@/data/navigation'
import { services } from '@/data/services'
import { contactInfo } from '@/data/contact'
import BrandLogo from '@/components/ui/BrandLogo.vue'

const year = new Date().getFullYear()
const mainServices = services.slice(0, 5)
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="site-footer__brand">
        <BrandLogo />
        <p>Aufnahme, Produktion und Klangerlebnisse mit Höhe, Dunkelheit und analoger Wärme.</p>
      </div>

      <nav aria-label="Footer-Navigation">
        <h2>Seiten</h2>
        <RouterLink
          v-for="item in navigationItems"
          :key="item.hash"
          :to="{ path: '/', hash: item.hash }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <nav aria-label="Wichtige Leistungen">
        <h2>Leistungen</h2>
        <RouterLink
          v-for="service in mainServices"
          :key="service.id"
          :to="{ path: '/', hash: '#servicios' }"
        >
          {{ service.title }}
        </RouterLink>
      </nav>

      <address>
        <h2>Kontakt</h2>
        <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
        <a :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`">{{ contactInfo.phone }}</a>
        <span>{{ contactInfo.address }}</span>
        <span>{{ contactInfo.schedule }}</span>
      </address>
    </div>

    <div class="container site-footer__bottom">
      <span>© {{ year }} Sherpa East Studio. Alle Rechte vorbehalten.</span>
      <div>
        <a href="#" aria-label="Impressum">Impressum</a>
        <a href="#" aria-label="Datenschutz">Datenschutz</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid rgba(215, 181, 109, 0.18);
  background: linear-gradient(180deg, rgba(5, 4, 3, 0), rgba(5, 4, 3, 0.92)), var(--color-ink);
}

.site-footer__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) repeat(3, minmax(150px, 1fr));
  gap: clamp(2rem, 5vw, 5rem);
  padding: clamp(58px, 8vw, 92px) 0 34px;
}

.site-footer__brand p,
address span,
address a,
nav a {
  color: var(--color-muted);
}

.site-footer__brand p {
  max-width: 330px;
  margin: 24px 0 0;
}

nav,
address {
  display: grid;
  align-content: start;
  gap: 0.58rem;
  font-style: normal;
}

h2 {
  margin: 0 0 0.6rem;
  color: var(--color-gold-bright);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

a {
  transition: color 180ms ease;
}

a:hover {
  color: var(--color-warm-white);
}

.site-footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 22px 0 34px;
  color: var(--color-stone);
  font-size: 0.86rem;
  border-top: 1px solid rgba(246, 239, 225, 0.08);
}

.site-footer__bottom div {
  display: flex;
  gap: 1rem;
}

@media (max-width: 860px) {
  .site-footer__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 620px) {
  .site-footer__grid,
  .site-footer__bottom,
  .site-footer__bottom div {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
