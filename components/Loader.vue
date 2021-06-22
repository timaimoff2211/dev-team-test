<template>
  <div class="loader">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden"></span>
    </div>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  z-index: 99;
  min-height: 100vh;
  min-width: 100vw;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>