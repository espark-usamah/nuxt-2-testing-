<template>
  <div class="layout">
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <Section-TheHeader />
    <div class="content-wrapper">
      <Nuxt />
    </div>
    <Section-TheFooter />
  </div>
</template>
<style>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.layout .content-wrapper {
  flex: 1;
}
.wrapper {
  height: 100%;
}
</style>
