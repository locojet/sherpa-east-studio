<template>
  <section class="section section--tight sonic-landscape" aria-labelledby="sonic-landscape-title">
    <div class="container sonic-landscape__grid">
      <div data-reveal>
        <p class="eyebrow">Frequenz / Höhe</p>
        <h2 id="sonic-landscape-title">Ein Berg aus Wellen</h2>
      </div>

      <div
        class="sonic-landscape__art"
        data-reveal
        aria-label="Abstrakter Berg aus Frequenzlinien"
        role="img"
      >
        <svg viewBox="0 0 900 360" aria-hidden="true" focusable="false">
          <path
            d="M28 300 C160 264 212 224 302 244 C392 264 430 96 516 132 C592 164 632 48 728 86 C806 116 844 206 876 300"
          />
          <path
            d="M64 270 C174 242 232 214 318 226 C406 238 444 118 522 148 C592 174 644 86 716 110 C786 134 820 212 850 270"
          />
          <path
            d="M98 238 C190 220 256 198 330 204 C420 212 456 140 528 162 C594 184 648 124 708 142 C762 158 800 218 822 238"
          />
          <path
            d="M132 206 C220 196 284 178 346 182 C424 188 466 156 532 176 C594 196 646 162 700 174 C746 184 776 214 794 206"
          />
          <path
            d="M168 176 C244 170 300 160 362 162 C432 164 476 174 538 190 C596 206 646 198 696 202 C732 206 758 208 774 176"
          />
        </svg>
        <div class="sonic-landscape__bars" aria-hidden="true">
          <span v-for="bar in 42" :key="bar" :style="{ animationDelay: `${bar * -34}ms` }"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sonic-landscape {
  overflow: hidden;
  background: linear-gradient(180deg, rgba(215, 181, 109, 0.08), transparent), var(--color-ink);
}

.sonic-landscape__grid {
  display: grid;
  grid-template-columns: minmax(260px, 0.55fr) minmax(320px, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

h2 {
  margin: 0;
  color: var(--color-warm-white);
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 5.2rem);
  line-height: 0.9;
}

.sonic-landscape__art {
  position: relative;
  min-height: 360px;
  overflow: hidden;
  border: 1px solid rgba(215, 181, 109, 0.18);
  border-radius: var(--radius-md);
  background: radial-gradient(circle at 45% 22%, rgba(215, 181, 109, 0.16), transparent 18rem),
    linear-gradient(145deg, rgba(246, 239, 225, 0.05), rgba(246, 239, 225, 0.015));
}

svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

path {
  fill: none;
  stroke: rgba(241, 215, 141, 0.58);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

path:nth-child(2n) {
  stroke: rgba(246, 239, 225, 0.22);
}

.sonic-landscape__bars {
  position: absolute;
  right: 28px;
  bottom: 28px;
  left: 28px;
  display: flex;
  height: 72px;
  align-items: center;
  gap: 6px;
}

.sonic-landscape__bars span {
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgba(241, 215, 141, 0.82), transparent);
  transform: scaleY(0.18);
  transform-origin: center;
  animation: meterRise 1300ms ease-in-out infinite;
}

@media (max-width: 800px) {
  .sonic-landscape__grid {
    grid-template-columns: 1fr;
  }
}
</style>
