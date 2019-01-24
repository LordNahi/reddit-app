<template>
  <div id="player">
    <video id="player-video" :src="av.video"></video>
    <video id="player-audio" :src="av.audio"></video>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IRedditVideo } from "../types";

interface IAV {
  video: string;
  audio: string;
}

export default Vue.extend({
  data() {
    return {
      av: {} as IAV,
      video: {} as Element,
      audio: {} as Element
    };
  },
  props: {
    data: {
      type: {} as () => IRedditVideo,
      required: true
    }
  },
  methods: {
    togglePlay() {},
    skip() {},
    handleRangeUpdate() {
      this.video[this.name] = this.value;
    },
    extractId(url: string) {
      /**
       * IRedditVideo dash_url should be shaped like so...
       * "https://v.redd.it/s9o5nq2oc3c21/DASHPlaylist.mpd"
       */

      // Split out url and returns the Id ...
      return url.split("/")[3];
    },
    buildLinks(url: string): { video: string; audio: string } {
      const id = this.extractId(url);

      // TODO: Return all potential DASH links ...
      const video = `https://v.redd.it/${id}/DASH_9_6_M`;
      const audio = `https://v.redd.it/${id}/audio`;

      return {
        video,
        audio
      };
    },
    beforeMount() {
      const player = document.querySelector(".player") as Element;

      const video = player.querySelector(".player-video");
      const audio = player.querySelector(".player-audio");
      const progress = player.querySelector(".progress");
    }
  }
});
</script>

