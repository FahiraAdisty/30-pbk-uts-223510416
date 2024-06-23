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
  margin: 0;
  padding: 0;
}

#app {
  margin: 20px;
}

header {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  position: relative; 
}

header:hover {
  background-color: #0056b3;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: left;
  margin: 0; 
}

nav li {
  margin-right: 20px;
}

nav a {
  color: #fff;
  text-decoration: none;
  padding: 10px;
  transition: color 0.2s ease;
  position: relative; 
  overflow: hidden; 
}

nav a:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #fff;
  transform: scaleX(0); 
  transform-origin: left;
  transition: transform 0.3s ease;
}

nav a:hover:before {
  transform: scaleX(1); 
}

nav a:hover {
  color: #f0f0f0;
}
</style>
