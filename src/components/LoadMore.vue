<template>
  <div class="container">
    <button class="button" @click="onPress">{{ buttonText }}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    loading: Boolean
  },
  methods: {
    onPress() {
      !this.loading && this.$emit("onPress");
    }
  },
  computed: {
    buttonText(): string {
      return this.loading ? "Loading..." : "Load more";
    }
  }
});
</script>

<style scoped>
.container {
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 15px;
}

.button {
  border-radius: 25px;
  height: 2em;
  font-size: 1.2em;
  font-weight: bold;
  border-width: 0px;
  background-color: #ff4500;
  color: #fff;
}

.button:hover {
  cursor: pointer;
}
</style>
