<template>
  <div @click="onPostSelect" class="card">
    <img class="thumbnail" :src="thumbnail">
    <h2 class="title">{{ title }}</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { IPost } from "../types";

export default Vue.extend({
  props: {
    post: Object as () => IPost
  },
  data() {
    return {
      title: this.post.title,
      url: this.post.url,
      is_video: this.post.is_video,
      thumbnail: this.post.thumbnail,
      thumbnail_height: this.post.thumbnail_height,
      thumbnail_width: this.post.thumbnail_width,
      media: this.post.media
    };
  },
  methods: {
    onPostSelect() {
      this.$emit("onPostSelect", this.post);
    }
  }
});
</script>

<style>
.card {
  display: flex;
  flex: 1;
  background-color: #fff;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 5px;
}

.card:hover {
  cursor: pointer;
}

.thumbnail {
  border-radius: 2px;
}

.card:first-child {
  margin-top: 15px;
}

.title {
  color: #222222;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-top: 0px;
  margin-left: 15px;
  font-weight: bold;
  font-size: 1.5em;
}
</style>