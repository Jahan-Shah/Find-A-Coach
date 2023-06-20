<script>
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/");
      }
    },
  },
};
</script>

<template>
  <TheHeader></TheHeader>
  <RouterView v-slot="slotProps">
    <Transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </Transition>
  </RouterView>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  translate: 0 -30px;
}
.route-leave-to {
  opacity: 0;
  translate: 0 30px;
}

.route-enter-active {
  transition: all 300ms ease-out;
}
.route-leave-active {
  transition: all 300ms ease-int;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  translate: 0;
}
</style>
