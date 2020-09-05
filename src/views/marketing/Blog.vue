<template>
  <div>
    <Header></Header>
    <section class="text-primary body-font overflow-hidden">
      <div class="container px-5 py-5 mx-auto">
        <div class="flex flex-col text-center w-full mb-6">
          <h1
            class="sm:text-4xl text-3xl font-medium title-font mb-2 text-primary"
          >{{ $t("marketing.blog.title") }}</h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{ $t("marketing.blog.headline") }}</p>
        </div>
        <div class="-my-8">
          <div v-for="(post, idx) in posts" :key="idx" class="py-8 flex flex-wrap md:flex-no-wrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span
                class="tracking-widest font-medium title-font text-primary"
              >{{ post.reading_time }} min</span>
              <span class="mt-1 text-gray-500 text-sm">
                {{
                $d(
                new Date(post.updated_at),
                "mini",
                $store.state.locale.locale
                )
                }}
              </span>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-primary title-font mb-2">
                <a :href="post.url" target="_blank">{{ post.title }}</a>
              </h2>
              <p class="leading-relaxed">{{ post.excerpt }}</p>
              <router-link
                :to="{ path: '/blog/' + post.slug }"
                class="text-theme-500 inline-flex items-center mt-4"
              >
                Read more...
                <svg
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "@/components/marketing/Header.vue";
import { blogService } from "../../services/marketing/BlogService";

@Component({ components: { Header } })
export default class BlogComponent extends Vue {
  posts: any = [];
  async mounted() {
    this.posts = await blogService.getPosts();
  }
}
</script>
