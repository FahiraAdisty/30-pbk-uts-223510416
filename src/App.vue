<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/todos">Todos</router-link></li>
          <li><router-link to="/post">Post</router-link></li>
          <li><router-link to="/album">Album</router-link></li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
body {
  font-family: sans-serif;
}

#app {
  margin: 20px;
}

header {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
}

nav li {
  margin-right: 20px;
}
</style>
