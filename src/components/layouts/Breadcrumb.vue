<template>
  <div>
    <div v-if="breadcrumb.length > 0">
      <nav class="sm:hidden">
        <button
          @click="pushToParent()"
          class="flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
        >
          <svg
            class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          {{ $t("shared.back") }}
        </button>
      </nav>
      <nav class="hidden sm:flex items-center text-lg leading-5 font-medium">
        <router-link
          v-for="(menuItem, idx) in breadcrumb"
          :key="idx"
          :to="menuItem.link"
          class="inline-block text-theme-500 hover:text-theme-700 transition duration-150 ease-in-out"
        >
          {{ menuItem.name }}
          <svg
            v-if="idx + 1 !== breadcrumb.length"
            class="flex-shrink-0 mx-2 h-5 w-5 text-gray-400 inline-flex"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadcrumbList: [],
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    $route(to, from) {
      this.updateList(to);
    },
  },
  methods: {
    routeTo(pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) {
        this.$router.push(this.breadcrumbList[pRouteTo].link);
      }
    },
    updateList(to) {
      // var tempList = this.$route.meta.breadcrumb;

      // var tempParent = this.$parent;
      // while (tempParent.$route) {
      //   if (tempParent.$route.meta.breadcrumb) {
      //     tempList.push(tempParent.$route.meta.breadcrumb);
      //     tempParent = tempParent.$parent;
      //   } else {
      //     break;
      //   }
      // }
      this.breadcrumbList = this.$route.meta.breadcrumb;
    },
    pushToParent() {
      const pathArray = this.$route.path.split("/");
      if (pathArray[pathArray.length - 1] === "") {
        pathArray.pop();
      }
      const routes = [];
      for (let index = 0; index < pathArray.length - 1; index++) {
        const element = pathArray[index];
        routes.push(element);
      }
      const parentRoute = routes.join("/");
      console.log("pushing; " + parentRoute);
      this.$router.push(parentRoute);
    },
  },
  computed: {
    breadcrumb() {
      // let pathArray = this.$route.path.split("/");
      // pathArray.shift();
      // let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
      //   const link = breadcrumbArray[idx - 1]
      //     ? "/" + breadcrumbArray[idx - 1].path + "/" + path
      //     : "/" + path;

      //   var result = path.replace(/(\w)(\w*)/g, function (_, i, r) {
      //     return i.toUpperCase() + (r != null ? r : "");
      //   });
      //   const name = this.$route.matched[idx]?.meta?.title || result;

      //   if (name) {
      //     breadcrumbArray.push({
      //       path: path,
      //       link,
      //       name,
      //     });
      //   }
      //   return breadcrumbArray;
      // }, []);
      // breadcrumbs[0].name = this.$t("shared.dashboard");
      // // breadcrumbs.shift();
      // // breadcrumbs.pop();
      // function isGuid(stringToTest) {
      //   if (stringToTest[0] === "{") {
      //     stringToTest = stringToTest.substring(1, stringToTest.length - 1);
      //   }
      //   var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}
      // \-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
      //   return regexGuid.test(stringToTest);
      // }
      // const lastPath = breadcrumbs[breadcrumbs.length - 1].name;
      // if (
      //   Number.isInteger(lastPath) ||
      //   isGuid(lastPath) ||
      //   lastPath === breadcrumbs[0].name
      // ) {
      //   breadcrumbs.pop();
      // }
      function isGuid(stringToTest) {
        if (stringToTest[0] === "{") {
          stringToTest = stringToTest.substring(1, stringToTest.length - 1);
        }
        const regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
        return regexGuid.test(stringToTest);
      }

      const pathArray = this.$route.path.split("/");
      if (pathArray[pathArray.length - 1] === "") {
        pathArray.pop();
      }
      const breadcrumbs = [];
      const previousRoutes = [];
      for (let index = 0; index < pathArray.length - 1; index++) {
        const current = previousRoutes.join("/") + "/" + pathArray[index];
        const result = pathArray[index].replace(/(\w)(\w*)/g, (_, i, r) => {
          return i.toUpperCase() + (r != null ? r : "");
        });
        previousRoutes.push(pathArray[index]);
        const element = {
          link: current,
          name: result,
        };
        if (!Number.isInteger(pathArray[index]) && !isGuid(pathArray[index])) {
          if (index > 0) {
            breadcrumbs.push(element);
          }
        } else {
          break;
        }
      }

      breadcrumbs[0].name = this.$t("shared.dashboard");
      return breadcrumbs;
    },
  },
};
</script>
