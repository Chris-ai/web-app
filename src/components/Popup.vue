<template>
  <div class="wrap-content">
    <div class="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    </div>
    {{ message }}
  </div>
</template>

<script >
export default {
  name: "Popup",
  props: ["message", "positive"],
};
</script>
<style lang="scss" scoped>
.wrap-content {
  position: absolute;
  top: 0;
  left: 5px;
  right: 0;
  bottom: -80%;
  margin: auto;
  width: 90vw;
  height: 30vh;
  max-width: 500px;
  max-height: 50px;
  display: flex;
  text-transform: uppercase;
  align-items: center;
  color: rgb(49, 49, 49);
  justify-content: center;
  border: 1px solid rgba($color: #696868, $alpha: 0.7);
  background: rgba($color: #696868, $alpha: 0.4);
  //   background: red;
  z-index: 6;
  opacity: 0;
  border-radius: 4px;
  animation: slide 0.5s forwards;
  -webkit-animation: slide 0.5s forwards;
  @media (min-width: 700px) {
    width: 50vw;
    max-width: 500px;
    max-height: 50px;
  }

  .icon {
    // justify-self: flex-start;
    height: 20px;
    width: 20px;
  }
}
// .content {
//   border: 1px solid rgba($color: #ccc, $alpha: 0.7);
//   background: white;
// }
// .positive {
//   border: 3px solid rgba($color: rgb(19, 112, 19), $alpha: 0.5);
//   background: rgba($color: rgb(112, 183, 112), $alpha: 1);
// }

// .negative {
//   border: 3px solid rgba($color: rgb(207, 50, 50), $alpha: 1);
//   background: rgba($color: rgb(221, 82, 82), $alpha: 1);
// }

@-webkit-keyframes slide {
  0% {
    bottom: -100%;
    opacity: 0;
  }
}

@keyframes slide {
  100% {
    bottom: -70%;
    opacity: 1;
  }
}
</style>
