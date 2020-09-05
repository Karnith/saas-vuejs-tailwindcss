<template>
  <div>
    <side-modal v-on:close="close" :title="getTitle">
      <template v-slot:content>
        <picture-input
          ref="pictureInput"
          width="600"
          height="600"
          margin="16"
          accept="image/jpeg,image/png,image/jpg,image/ico"
          size="10"
          button-class="btn"
          :custom-strings="customStrings"
          @change="onChange"
        >
        </picture-input>
      </template>
    </side-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../BaseComponent.vue";

import PictureInput from "vue-picture-input";
import SideModal from "../modals/SideModal.vue";
import { Prop } from "vue-property-decorator";
@Component({
  components: { PictureInput, SideModal },
})
export default class UploadImageComponent extends BaseComponent {
  @Prop()
  title!: string;
  @Prop()
  image!: string;
  customStrings = {} as any;
  mounted() {
    // @ts-ignore
    this.$refs.pictureInput.image = this.image;
    this.customStrings = {
      upload: "<p>Your device does not support file uploading.</p>", // HTML allowed
      drag: "Drag an image or <br>click hasfasfsfaere to select a file", // HTML allowed
      tap: "Tap here to select a photo <br>from your gallery", // HTML allowed
      change: "Change Photo", // Text only
      remove: "Remove Photo", // Text only
      select: "Select a Photo", // Text only
      selected: "<p>Photo successfully selected!</p>", // HTML allowed
      fileSize: "The file size exceeds the limit", // Text only
      fileType: "This file type is not supported.", // Text only
      aspect: "Landscape/Portrait", // Text only
    };
  }
  onChange() {
    if (this.loadedImage) {
      this.$emit("loaded", this.loadedImage);
    }
  }
  get loadedImage() {
    // @ts-ignore
    return this.$refs.pictureInput.image;
  }
  close() {
    this.$emit("close");
  }
  get getTitle() {
    return this.$t("shared.upload") + " " + this.title;
  }
}
</script>

<style></style>
