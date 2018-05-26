<template>
  <main>
    <lighthouse />

    <button class="mute" @click="toggleMute">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M426.667 106.667c-47.128 0-85.333 38.205-85.333 85.333H384c0-23.564 19.103-42.667 42.667-42.667s42.667 19.102 42.667 42.667-19.103 42.667-42.667 42.667H128v42.667h298.667C473.795 277.333 512 239.128 512 192s-38.205-85.333-85.333-85.333zM339.778 320H85.333v42.667h254.445c23.564 0 42.667 19.103 42.667 42.667v1.555c0 22.705-18.406 41.112-41.112 41.112v42.667c46.27 0 83.778-37.509 83.778-83.778v-1.555c.001-47.13-38.204-85.335-85.333-85.335zM0 234.667h85.333v42.667H0z"/>
        <path d="M213.077 21.333c-46.411 0-84.035 37.624-84.035 84.035v5.392h42.667v-5.392C171.709 82.521 190.23 64 213.077 64s41.368 18.521 41.368 41.368v1.299c0 23.564-19.103 42.667-42.667 42.667H42.667V192h169.112c47.128 0 85.333-38.205 85.333-85.333v-1.299c0-46.411-37.624-84.035-84.035-84.035z"/>
      </svg>
    </button>

  </main>
</template>

<style lang="scss">

svg {
  #powerLever {
    transform-origin: 0px 0 100px;
  }
  #clickable path{
    fill: transparent !important;
    cursor: help;
  }
}


html, body, #app {
  height: 100%;
}
body {
  margin: 0;
  background-color: #A7D5CC;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto;
}

main {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;

  .scene {
    max-width: 1000px;
  }
}

.mute {
  align-self: start;
  position: absolute;
  top: 20px;

  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;

  svg {
    width: 30px;

    path {
      fill: #eee;
    }
  }
}
</style>

<script src="./home.js" />