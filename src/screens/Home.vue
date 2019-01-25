<template>
  <div class="container">
    <div id="feed" class="feed">
      <CardComponent
        v-for="post in posts"
        :key="post.url"
        :post="post"
        @onPostSelect="handlePostSelect"
        @onSubSelect="getPosts"
      />
      <LoadMoreComponent @onPress="getPosts" :loading="loading"/>
    </div>
    <div class="post-content">
      <RedditVideoComponent v-if="isRedditVideo" :src="selectedPost.url"/>
      <div v-else-if="selectedPost">
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
import CardComponent from "../components/Card.vue";
import RedditVideoComponent from "../components/RedditVideo.vue";
import LoadMoreComponent from "../components/LoadMore.vue";

import { IPost } from "../types";

export default Vue.extend({
  data() {
    return {
      loading: false,
      selectedPost: undefined as IPost | undefined,
      isRedditVideo: false,
      posts: [] as IPost[],
      sub: "",
      after: ""
    };
  },
  components: {
    CardComponent,
    RedditVideoComponent,
    LoadMoreComponent
  },
  methods: {
    handlePostSelect(post: IPost) {
      post.url = this.sanitiseUrl(post.url);
      this.selectedPost = post;
    },
    getPosts(sub?: string) {
      if (sub && sub !== this.sub) {
        this.after = "";
        this.posts = [];
        this.sub = sub;
      }

      let body = "";
      let prefixedSub = this.sub !== "" ? `r/${this.sub}` : "";
      let prefixedAfter = this.after !== "" ? `&after=${this.after}` : "";
      let url = `https://www.reddit.com/${prefixedSub}.json?limit=50${prefixedAfter}`;

      this.loading = true;

      http
        .get(url, resposnse => {
          let body = "";

          resposnse.on("data", chunk => {
            body += chunk;
          });

          resposnse.on("end", () => {
            const response = JSON.parse(body);
            const posts = response.data.children;
            this.after = response.data.after;

            for (const post of posts) {
              const data: IPost = post.data;

              this.posts.push(data);
            }

            console.log(this.posts);

            this.loading = false;
          });
        })
        .on("error", e => {
          console.log("Got an error: ", e);
        });
    },
    sanitiseUrl(url: string) {
      let sanitisedUrl = url;
      let websites = [
        {
          domain: "https://i.imgur.com",
          mirror: "https://imgur.kageurufu.net"
        },
        {
          domain: "http://gfycat.com/",
          mirror: "https://giant.gfycat.com/",
          append: ".gif"
        }
      ];

      this.isRedditVideo = false;
      if (sanitisedUrl.includes("https://v.redd.it/")) {
        this.isRedditVideo = true;
      } else {
        for (let website of websites) {
          if (sanitisedUrl.includes(website.domain)) {
            if (website.mirror) {
              sanitisedUrl = sanitisedUrl.replace(
                website.domain,
                website.mirror
              );

              if (website.append) {
                sanitisedUrl += website.append;
              }
            }
          }
        }
      }

      return sanitisedUrl;
    }
  },
  beforeMount() {
    this.getPosts("publicfreakout");
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
  color: #dae0e6;
}

.title {
  margin-top: 0px;
  margin-left: 15px;
  font-weight: bold;
  font-size: 1.5em;
}
</style>