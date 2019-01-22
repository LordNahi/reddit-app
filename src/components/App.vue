<template>
  <div class="container">
    <div class="feed">
      <CardComponent
        v-for="post in posts"
        :key="post.url"
        :post="post"
        @onPostSelect="handlePostSelect"
      />
    </div>
    <div class="post-content">
      <div v-if="selectedPost">
        <video
          v-if="selectedPost.is_video"
          preload="auto"
          autoplay="autoplay"
          loop="loop"
          class="post-image"
        >
          <source :src="selectedPost.media.reddit_video.fallback_url" type="video/webm">
        </video>
        <img v-else class="post-image" :src="selectedPost.url">
      </div>
      <div v-else class="no-image">
        <h1 class="click-a-post">Click a post!</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as http from "http";
import CardComponent from "./Card.vue";

import { IPost } from "../types";

export default Vue.extend({
  data() {
    return {
      selectedPost: undefined as IPost | undefined,
      posts: [] as IPost[],
      sub: "",
      after: ""
    };
  },
  components: {
    CardComponent
  },
  methods: {
    handlePostSelect(post: IPost) {
      this.selectedPost = post;
    },
    getPosts(sub?: string) {
      if (sub && sub !== this.sub) {
        this.after = "";
        this.sub = sub;
      }

      let body = "";
      let currentAfter = this.after !== "" ? `&after=${this.after}` : "";
      let url = `https://www.reddit.com/r/${
        this.sub
      }.json?limit=50${currentAfter}`;
      let nextAfter = "";

      http
        .get(url, resposnse => {
          let body = "";

          resposnse.on("data", chunk => {
            body += chunk;
          });

          resposnse.on("end", () => {
            const response = JSON.parse(body);
            const posts = response.data.children;
            const nextAfter = response.data.after;

            for (const post of posts) {
              const data: IPost = post.data;

              this.posts.push(data);
            }
          });
        })
        .on("error", e => {
          console.log("Got an error: ", e);
        });
    }
  },
  mounted() {
    this.getPosts("funny");
  }
});
</script>

<style>
.container {
  display: flex;
}

.feed {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.post-frame {
  padding: 15px;
  border-radius: 5px;
}

.post-content {
  position: fixed;
  overflow-y: scroll;
  background-color: #fff;
  width: 50%;
  height: 100%;
  right: 0;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.post-image {
  max-width: 100%;
  min-width: 100%;
}

.click-a-post {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #dae0e6;
}

.title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-top: 0px;
  margin-left: 15px;
  font-weight: bold;
  font-size: 1.5em;
}
</style>