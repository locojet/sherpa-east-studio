<script setup lang="ts">
import { useRevealOnScroll } from '@/composables/useRevealOnScroll'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import InfoSection from '@/components/home/InfoSection.vue'
import MusicVideoSection from '@/components/home/MusicVideoSection.vue'
import ProjectsGallery from '@/components/home/ProjectsGallery.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import SonicLandscape from '@/components/home/SonicLandscape.vue'
import StudioSection from '@/components/home/StudioSection.vue'
import TeamSection from '@/components/home/TeamSection.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'

useRevealOnScroll()
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main>
      <HeroSection />
      <StudioSection />
      <ServicesSection />
      <ProjectsGallery />
      <MusicVideoSection />
      <SonicLandscape />
      <TeamSection />
      <TestimonialsSection />
      <InfoSection />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
main {
  min-width: 0;
}
</style>
