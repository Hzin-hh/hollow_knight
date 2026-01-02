<template>

  <div class="title-group">
     <img src="@/assets/title_bg_1.png" class="pic top-pic" alt="top">
     <h1 class="title">{{ msg }}</h1>
     <img src="@/assets/title_bg_2.png" class="pic bottom-pic" alt="bottom">
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<style scoped>

.title-group {
  position: absolute;
  top: 2rem;             
  left: 50%;
  transform: translateX(-50%); 
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;    
}

.top-pic{
  width: 500px;
  position:absolute;
  bottom: 100%;
  margin-bottom: -20px;
}

.title {
  font-family: "SimHei", "Heiti SC", sans-serif;
  font-size: 4rem;
  margin: 0;
  color:aliceblue ;
}

.bottom-pic{
  width: 450px;
   position: absolute;
  top: 100%;            
  margin-top: -20px;
}

</style>