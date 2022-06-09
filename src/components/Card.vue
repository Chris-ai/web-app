<template>
  <div class="card-container">
    <div class="counter">
      {{ count }}
    </div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["count", "message"],
};
</script>

<style lang='scss'>
.card-container {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba($color: lightblue, $alpha: 0.7);
  box-shadow: 0px 0px 5px 0 rgba($color: rgb(222, 220, 220), $alpha: 0.8);
  margin: 1rem;
  padding: 1rem;
  position: relative;
  width: 150px;
  height: 200px;
  border-radius: 6px;

  .counter {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "IBM Plex Mono", sans-serif;
    font-weight: 700;
    font-size: 36px;
    border: 1px solid rgba($color: #eee, $alpha: 1);
    position: absolute;
    top: 50px;
    background: white;
    box-shadow: 0 4px 4px 0 rgba(#d5d5d5, 0.5);
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
  }

  .message {
    text-transform: uppercase;
    font-weight: 700;
  }
}
</style>