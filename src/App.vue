<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: { Navbar },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400&family=Poppins:wght@300;400;700&display=swap");
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Poppins, Helvetica, sans-serif;
  font-weight: 500;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  color: #1b1c1e;
  width: 100vw;
  height: 100vh;

  .activeLink {
    border-bottom: 3px solid rgba($color: lightblue, $alpha: 1);
  }
}
</style>
