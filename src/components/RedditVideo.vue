<template>
  <div v-if="video !== ''" class="player">
    <video class="player-video" :src="video_url"></video>
    <audio class="player-audio" :src="audio_url"></audio>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { IRedditVideo } from "../types";

export default Vue.extend({
  props: ["src"],
  data() {
    return {
      percent: 0,
      video_url: "",
      video_loaded: false,
      audio_url: "",
      audio_loaded: false,
      video: {} as HTMLMediaElement,
      audio: {} as HTMLMediaElement,
      progress: {} as HTMLElement
    };
  },
  methods: {
    togglePlay() {
      const method = this.video.paused ? "play" : "pause";
      this.video[method]();
      this.audio[method]();
    },
    handleProgress() {
      this.percent = (this.video.currentTime / this.video.duration) * 100;
    },
    scrub(e: MouseEvent) {
      const scrubTime =
        (e.offsetX / this.progress.offsetWidth) * this.video.duration;
      this.video.currentTime = scrubTime;
      this.audio.currentTime = scrubTime;
    },
    extractId(url: string) {
      /**
       * IRedditVideo dash_url should be shaped like so...
       * "https://v.redd.it/s9o5nq2oc3c21/DASHPlaylist.mpd"
       */

      // Split out url and returns the Id ...
      return url.split("/")[3];
    },
    setLinks(url: string) {
      const id = this.extractId(url);

      // TODO: Return all potential DASH links ...

      this.video_url = `https://v.redd.it/${id}/DASH_1_2_M`;
      this.audio_url = `https://v.redd.it/${id}/audio`;

      console.log("VIDEO:", this.video_url);
      console.log("AUDIO:", this.audio_url);
    },
    mediaLoaded(media: "video" | "audio") {
      switch (media) {
        case "video":
          this.video_loaded = true;
        case "audio":
          this.audio_loaded = true;
      }
    }
  },
  mounted() {
    const player = document.querySelector(".player") as HTMLElement;

    this.video = player.querySelector(".player-video") as HTMLMediaElement;
    this.video.addEventListener("canplay");

    this.audio = player.querySelector(".player-audio") as HTMLMediaElement;
    this.audio.addEventListener("canplay");

    this.progress = player.querySelector(".progress") as HTMLElement;

    this.setLinks(this.src);
  },
  destroyed() {
    this.video.removeEventListener("canplay", () => {
      this.video_loaded = true;
    });
    this.audio.removeEventListener("canplay", () => {
      this.audio_loaded = true;
    });
  }
});
</script>

<style>
.player {
  width: 100%;
}
</style>


