<template>
  <div class="carousel-gallery">
    <div class="carousel-header">
      <h3>地图背景轮播展示</h3>
      <p>点击缩略图切换不同区域</p>
    </div>
    
<!-- 主展示区 -->
<div class="main-image-container">
  <div class="image-wrapper">
    <img 
      :src="currentImage.src" 
      :alt="currentImage.name"
      class="main-image"
      @click="openFullscreen"
    />
    <div class="image-info">
      <h4>{{ currentImage.name }}</h4>
      <p>{{ currentImage.description }}</p>
    </div>
  </div>
</div>
    
   <!-- 缩略图导航 -->
<div class="thumbnail-nav">
  <div 
    v-for="(img, index) in images" 
    :key="img.id"
    class="thumbnail" 
    :class="{ active: currentIndex === index }"
    @click="selectImage(index)"
  >
    <img :src="img.thumbnail" :alt="img.name" class="thumb-img" />
    <span>{{ img.name }}</span>
  </div>
</div>
    
<!-- 控制按钮 -->
<div class="gallery-controls">
  <button class="control-btn" @click="prevImage">← 上一个</button>
  <span class="counter">{{ currentIndex + 1 }} / {{ images.length }}</span>
  <button class="control-btn" @click="nextImage">下一个 →</button>
</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 使用图床在线图片
const images = ref([
  {
    id: 1,
    name: '德特茅斯',
    description: '衰败的小镇入口',
    src: 'https://i.imgur.com/6v8J9cW.png',
    thumbnail: 'https://i.imgur.com/6v8J9cW.png'
  },
  {
    id: 2, 
    name: '苍绿之径',
    description: '生机盎然的森林区域',
    src: 'https://i.imgur.com/Zy7N9qT.png',
    thumbnail: 'https://i.imgur.com/Zy7N9qT.png'
  },
  {
    id: 3,
    name: '泪水之城', 
    description: '永远下雨的辉煌都市',
    src: 'https://i.imgur.com/8m9K3pQ.png',
    thumbnail: 'https://i.imgur.com/8m9K3pQ.png'
  },
  {
    id: 4,
    name: '水晶山峰',
    description: '发光的水晶矿洞', 
    src: 'https://i.imgur.com/xL5dVrF.png',
    thumbnail: 'https://i.imgur.com/xL5dVrF.png'
  },
  {
    id: 5,
    name: '深邃巢穴',
    description: '黑暗的蜘蛛巢穴',
    src: 'https://i.imgur.com/t9v7YyR.png',
    thumbnail: 'https://i.imgur.com/t9v7YyR.png'
  }
]);

const currentIndex = ref(0);
const currentImage = computed(() => images.value[currentIndex.value]);

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const selectImage = (index: number) => {
  currentIndex.value = index;
};

const openFullscreen = () => {
  window.open(currentImage.value.src, '_blank');
};
</script>

<style scoped>
.carousel-gallery {
  background: rgba(30, 25, 20, 0.7);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #5d4d3a;
}

.carousel-header {
  text-align: center;
  margin-bottom: 20px;
}

.carousel-header h3 {
  color: #e8d8b8;
  margin-bottom: 5px;
}

.carousel-header p {
  color: #b8a488;
  font-size: 0.9rem;
}

.main-image-placeholder {
  margin-bottom: 20px;
}

.placeholder-content {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.5);
}

.image-sim {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.thumbnail-nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
}

.thumbnail {
  width: 100px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s;
}

.thumbnail:hover {
  opacity: 0.9;
}

.thumbnail.active {
  opacity: 1;
  transform: translateY(-5px);
}

.thumbnail > div {
  height: 70px;
  border-radius: 4px;
  margin-bottom: 5px;
}

.thumbnail span {
  display: block;
  text-align: center;
  color: #b8a488;
  font-size: 0.85rem;
}

.gallery-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.control-btn {
  background: #5d4d3a;
  color: #e8d8b8;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.control-btn:hover {
  background: #6b5a45;
}

.counter {
  color: #b8a488;
  min-width: 60px;
  text-align: center;
}
</style>
/* 添加在主展示区样式后面 */
.main-image-container {
  margin-bottom: 20px;
}

.image-wrapper {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.5);
}

.main-image {
  width: 100%;
  height: 380px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s;
}

.main-image:hover {
  transform: scale(1.02);
}

.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.85));
  color: white;
  padding: 15px 20px;
}

.image-info h4 {
  margin: 0 0 5px 0;
  font-size: 1.3rem;
}

.image-info p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

/* 修改缩略图样式 */
.thumb-img {
  width: 100%;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 5px;
  border: 2px solid transparent;
}

.thumbnail.active .thumb-img {
  border-color: #e8d8b8;
}
