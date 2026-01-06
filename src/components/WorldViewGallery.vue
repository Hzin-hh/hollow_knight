<script setup lang="ts">
import { computed, ref } from 'vue'

interface WorldviewSlide {
  id: number
  imageUrl: string
  title: string
  description: string
}

const props = defineProps<{
  slides: WorldviewSlide[]
}>()

const currentIndex = ref(0)

const total = computed(() => props.slides.length)

const leftIndex = computed(() =>
  total.value ? (currentIndex.value - 1 + total.value) % total.value : 0,
)
const rightIndex = computed(() => (total.value ? (currentIndex.value + 1) % total.value : 0))

const currentSlide = computed(() => (total.value ? props.slides[currentIndex.value] : null))

function showPrev() {
  if (!total.value) return
  currentIndex.value = (currentIndex.value - 1 + total.value) % total.value
}

function showNext() {
  if (!total.value) return
  currentIndex.value = (currentIndex.value + 1) % total.value
}

function handleClickSlide(position: 'left' | 'right' | 'center') {
  if (position === 'left') {
    showPrev()
  } else if (position === 'right') {
    showNext()
  }
}
</script>

<template>
  <div class="worldview-gallery">
    <div class="gallery-inner">
      <button class="nav-button left" type="button" @click="showPrev">‹</button>

      <div class="carousel-viewport">
        <div class="carousel-track">
          <div
            v-for="(slide, index) in slides"
            :key="slide.id"
            v-show="index === currentIndex || index === leftIndex || index === rightIndex"
            class="slide-wrapper"
            :class="{
              'is-center': index === currentIndex,
              'is-left': index === leftIndex,
              'is-right': index === rightIndex,
            }"
            @click="
              handleClickSlide(
                index === currentIndex ? 'center' : index === leftIndex ? 'left' : 'right',
              )
            "
          >
            <div class="slide-frame">
              <img class="slide-image" :src="slide.imageUrl" :alt="slide.title" />

              <!-- 四角装饰边框 -->
              <img class="corner corner-tl" src="@/assets/frame/corner_top_left.png" alt="" />
              <img class="corner corner-tr" src="@/assets/frame/corner_top_right.png" alt="" />
              <img class="corner corner-bl" src="@/assets/frame/corner_bottom_left.png" alt="" />
              <img class="corner corner-br" src="@/assets/frame/corner_bottom_right.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <button class="nav-button right" type="button" @click="showNext">›</button>
    </div>

    <div v-if="currentSlide" class="slide-info">
      <h2 class="slide-title">
        {{ currentSlide.title }}
      </h2>
      <p class="slide-description">
        {{ currentSlide.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.worldview-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f5ecd8;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
}

.gallery-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  perspective: 1600px;
}

.carousel-viewport {
  width: 860px;
  max-width: 100%;
  height: 420px;
  position: relative;
  overflow: visible;
}

.carousel-track {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 55%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition:
    transform 300ms ease,
    opacity 300ms ease,
    filter 300ms ease,
    z-index 300ms ease;
  opacity: 0;
  filter: grayscale(30%) brightness(0.7);
  z-index: 1;
}

.slide-wrapper.is-center {
  transform: translate(-50%, -50%) translateX(0) scale(1.2);
  opacity: 1;
  filter: grayscale(0) brightness(1);
  z-index: 3;
}

.slide-wrapper.is-left {
  transform: translate(-50%, -50%) translateX(-260px) scale(0.85) rotateY(18deg);
  opacity: 0.6;
  z-index: 2;
}

.slide-wrapper.is-right {
  transform: translate(-50%, -50%) translateX(260px) scale(0.85) rotateY(-18deg);
  opacity: 0.6;
  z-index: 2;
}

.slide-frame {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.8),
    0 0 35px rgba(184, 148, 92, 0.45);
  background: radial-gradient(circle at top, #383340 0, #131019 55%, #05050a 100%);
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.corner {
  position:absolute;
  width: 60px;
  height: 60px;
  pointer-events: none;
}

.corner-tl {
  top: 0;
  left: 0;
}

.corner-tr {
  top: 0;
  right: 0;
}

.corner-bl {
  bottom: 0;
  left: 0;
}

.corner-br {
  bottom: 0;
  right: 0;
}

.nav-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(222, 198, 140, 0.8);
  background: radial-gradient(circle at 30% 20%, #2c262f, #050308);
  color: #f5ecd8;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.8);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.nav-button:hover {
  transform: translateY(-1px) scale(1.05);
  box-shadow:
    0 0 18px rgba(235, 210, 160, 0.6),
    0 20px 35px rgba(0, 0, 0, 0.8);
  background: radial-gradient(circle at 30% 20%, #3a303c, #09040e);
}

.nav-button:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
}

.slide-info {
  margin-top: 2.2rem;
  max-width: 720px;
  text-align: center;
}

.slide-title {
  font-size: 2rem;
  letter-spacing: 0.16em;
  margin-bottom: 0.9rem;
  color: #ffffff;
}

.slide-description {
  font-size: 1rem;
  line-height: 1.9;
  color: #ffffff;
  max-width: 700px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .carousel-viewport {
    height: 360px;
  }

  .slide-wrapper {
    width: 65%;
  }

  .slide-wrapper.is-left {
    transform: translate(-50%, -50%) translateX(-190px) scale(0.82) rotateY(16deg);
  }

  .slide-wrapper.is-right {
    transform: translate(-50%, -50%) translateX(190px) scale(0.82) rotateY(-16deg);
  }
}

@media (max-width: 768px) {
  .gallery-inner {
    gap: 0.75rem;
  }

  .carousel-viewport {
    height: 300px;
  }

  .slide-wrapper {
    width: 76%;
  }

  .slide-wrapper.is-left {
    transform: translate(-50%, -50%) translateX(-140px) scale(0.78) rotateY(12deg);
  }

  .slide-wrapper.is-right {
    transform: translate(-50%, -50%) translateX(140px) scale(0.78) rotateY(-12deg);
  }

  .slide-title {
    font-size: 1.6rem;
  }

  .slide-description {
    font-size: 0.95rem;
  }
}
</style>
