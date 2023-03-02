<template>
  <div class="auth-Screen">
    <div></div>
    <div class="content-form">
      <h1>lOGIN</h1>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'auth',
}
</script>
<style scoped>
.auth-Screen {
  display: flex;
  height: inherit;
}
.auth-Screen div:first-child {
  background: rgb(181, 230, 181);
}
.auth-Screen div {
  flex: 1;
}
.content-form {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
