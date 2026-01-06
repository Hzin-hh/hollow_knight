<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import WorldViewGallery from '@/components/WorldViewGallery.vue'

const worldviewSlides = [
  {
    id: 1,
    imageUrl: new URL('@/assets/worldview/Dream.png', import.meta.url).href,
    title: '梦境与回忆',
    description:
      '通过梦之钉，骑士得以窥见圣巢往昔的辉煌与掩埋的哀伤，那些沉睡的回忆是揭开一切的关键。'
  },
  {
    id: 2,
    imageUrl: new URL('@/assets/worldview/Hallownest.png', import.meta.url).href,
    title: '圣巢的陨落',
    description:
      '伟大的昆虫王国‘圣巢’，在苍白之王的统治下达到鼎盛，却因一场无法遏制的‘感染’而迅速腐朽、沉寂。'
  },
  {
    id: 3,
    imageUrl: new URL('@/assets/worldview/Infection.png', import.meta.url).href,
    title: '猩红瘟疫',
    description:
      '一种橙红色的、具有传染性的疯狂瘟疫，自深渊蔓延，扭曲生灵的心智与形态，是王国衰亡的直接根源。'
  },
  {
    id: 4,
    imageUrl: new URL('@/assets/worldview/Seals.png', import.meta.url).href,
    title: '封印与守护',
    description:
      '为了遏制感染，苍白之王设下了强大的封印与守护者。这些古老的屏障，如今既是保护，也是枷锁。'
  },
  {
    id: 5,
    imageUrl: new URL('@/assets/worldview/Void.png', import.meta.url).href,
    title: '虚空之力',
    description:
      '深渊之下涌动的本源力量，冰冷、虚无且难以控制。它既是毁灭的象征，也可能蕴含着最终的答案。'
  }
]
</script>

<template>
  <div class="story-view-root">
    <PageTitle msg="世界观" />

    <div class="story-content">
      <WorldViewGallery :slides="worldviewSlides" />
    </div>
  </div>
</template>

<style scoped>
.story-view-root {
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: transparent;
}

.story-content {
  margin-top: 220px;
  padding: 2.5rem 1.5rem 3.5rem;
  width: 100%;
  max-width: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .story-content {
    margin-top: 210px;
    padding-inline: 1rem;
  }
}
</style>
