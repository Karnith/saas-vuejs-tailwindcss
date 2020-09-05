<template>
  <div>
    <Header></Header>
    <!-- This component requires Tailwind CSS >= 1.5.1 and @tailwindcss/ui >= 0.4.0 -->
    <div class="relative py-16 bg-primary overflow-hidden">
      <div class="relative px-4 sm:px-6 lg:px-8">
        <router-link
          to="/blog"
          class="flex items-center text-xl leading-5 font-medium text-primary hover:text-theme-700 transition duration-150 ease-in-out"
        >
          <svg
            class="flex-shrink-0 -ml-1 mr-1 h-8 w-8 text-theme-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          {{ $t("marketing.blog.title") }}
        </router-link>
        <div v-if="loading">{{$t("shared.loading")}}</div>
        <div v-else-if="!post || !post.title" class="text-red-500">{{$t("shared.invalidPost")}}</div>
        <div v-else>
          <div class="text-lg mx-auto mb-6">
            <p
              class="text-base text-center leading-6 text-theme-600 font-semibold tracking-wide uppercase"
            >
              <router-view
                to="/blog"
                class="flex items-center text-xl leading-5 font-medium text-primary hover:text-theme-700 transition duration-150 ease-in-out"
              >
                <svg
                  class="flex-shrink-0 -ml-1 mr-1 h-8 w-8 text-theme-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ $t("marketing.blog.title") }}
              </router-view>
              {{ post.reading_time }} min -
              {{
              $d(
              new Date(post.updated_at),
              "short",
              $store.state.locale.locale
              )
              }}
            </p>
            <h1
              class="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-primary sm:text-4xl sm:leading-10"
            >
              <a :href="post.url" target="_blank">{{ post.title }}</a>
            </h1>
            <!-- <p class="text-xl text-gray-500 leading-8">
              {{ post.excerpt }}
            </p>-->
          </div>
          <div class="max-w-screen-lg text-primary mx-auto">
            <div v-html="post.html"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Header from "@/components/marketing/Header.vue";
import { blogService } from "../../services/marketing/BlogService";

@Component({ components: { Header } })
export default class BlogPostComponent extends Vue {
  post: any = {};
  loading: boolean = false;
  mounted() {
    this.getPost();
  }
  getPost() {
    this.loading = true;
    blogService
      .getPost(this.$route.params.slug)
      .then((response) => {
        this.post = response;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

<style src="@/assets/css/ghost.css" scoped></style>
