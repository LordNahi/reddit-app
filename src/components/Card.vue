<template>
  <div @click="onPostSelect" class="card">
    <img v-if="thumbnail" class="thumbnail" :src="thumbnail">
    <div class="card-content">
      <div class="card-row-top">
        <div>
          <h2 class="title">{{ truncatedTitle }}</h2>
          <h3 class="author">{{ prefixedAuthor }}</h3>
        </div>
        <h3 @click="onSubSelect()" class="sub">{{ prefixedSub }}</h3>
      </div>
      <div class="card-row-bottom">
        <h3 class="score">{{ score }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { isURL } from "validator";

import { IPost } from "../types";

export default Vue.extend({
  props: {
    post: Object as () => IPost
  },
  data() {
    return {
      title: this.post.title,
      is_video: this.post.is_video,
      url: undefined as string | undefined,
      thumbnail: undefined as string | undefined,
      thumbnail_height: this.post.thumbnail_height,
      thumbnail_width: this.post.thumbnail_width,
      author: this.post.author,
      sub: this.post.subreddit,
      media: this.post.media,
      score: this.post.score
    };
  },
  computed: {
    prefixedAuthor(): string {
      return `/u/${this.author}`;
    },
    prefixedSub(): string {
      return `/r/${this.sub}`;
    },
    truncatedTitle(): string {
      if (this.title.length > 100) {
        return this.title.substr(0, 100) + "...";
      }
      return this.title;
    }
  },
  methods: {
    onPostSelect() {
      this.$emit("onPostSelect", this.post);
    },
    onSubSelect() {
      this.$emit("onSubSelect", this.sub);
    },
    getUrl(url: string) {
      return isURL(url) ? url : undefined;
    }
  },
  beforeMount() {
    this.thumbnail = this.getUrl(this.post.thumbnail);
  }
});
</script>

<style scoped>
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

.card-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.card-row-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card-row-bottom {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.card:hover {
  cursor: pointer;
}

.thumbnail {
  border-radius: 2px;
  margin-right: 15px;
}

.thumbnail-noimage {
  width: 100%;
  height: 100%;
}

.card:first-child {
  margin-top: 15px;
}

.title {
  color: #222222;
  margin: 0px;
  font-weight: bold;
  font-size: 1.5em;
}

.sub {
  color: #adadad;
  margin: 0px;
  font-weight: bold;
}

.sub:hover {
  text-decoration: underline;
}

.author {
  color: #adadad;
  margin: 0px;
  font-weight: bold;
}

.score {
  align-self: flex-end;
  margin-bottom: 0;
  color: #ff4500;
}
</style>