<template>
  <header>
    <div class="container-fluid">
      <nav class="d-flex justify-content-between">
        <div>
          <nuxt-link to="/Home">Home</nuxt-link>
          <nuxt-link to="/About">About </nuxt-link>
          <nuxt-link to="/">Contact</nuxt-link>
        </div>
        <div>
          <nuxt-link to="/Auth/Login">Login</nuxt-link>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  name: 'TheHeader',
}
</script>
<style scoped>
header {
  background-color: white;
  height: 8vh;
  /* box-shadow: 0 10px 25px rgb(167, 165, 165); */
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
nav a {
  color: green;
  font-weight: bold;
  margin-right: 2rem;
  display: inline-block;
  text-decoration: none;
  transition: all 0.3s ease;
}
nav a:hover {
  transform: rotateZ(-15deg);
  text-shadow: 1px 1px 4px green;
}
</style>
