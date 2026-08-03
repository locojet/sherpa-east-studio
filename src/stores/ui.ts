import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isMenuOpen = ref(false)
  const isHeaderCompact = ref(false)

  const menuLabel = computed(() => (isMenuOpen.value ? 'Menü schließen' : 'Menü öffnen'))

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }

  function closeMenu() {
    isMenuOpen.value = false
  }

  function setHeaderCompact(value: boolean) {
    isHeaderCompact.value = value
  }

  return {
    isMenuOpen,
    isHeaderCompact,
    menuLabel,
    toggleMenu,
    closeMenu,
    setHeaderCompact,
  }
})
