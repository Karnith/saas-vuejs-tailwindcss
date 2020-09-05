<template>
  <div>
    <div
      :class="
        appTheme +
          ' ' +
          appColor +
          ' h-screen flex overflow-hidden bg-gray-100 text-gray-800 '
      "
    >
      <!-- Off-canvas menu for mobile -->
      <div class="md:hidden" v-if="sidebarOpen">
        <div class="fixed inset-0 flex z-40">
          <!--
        Off-canvas menu overlay, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
          -->
          <div class="fixed inset-0">
            <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
          <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
          -->
          <div
            class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary"
          >
            <div class="absolute top-0 right-0 -mr-14 p-1">
              <button
                @click="sidebarOpen = !sidebarOpen"
                class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                aria-label="Close sidebar"
              >
                <svg
                  class="h-6 w-6 text-primary"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex-shrink-0 flex items-center px-4">
              <router-link to="/app">
                <div class="w-24">
                  <div v-if="$store.state.theme.appTheme === 'theme-bg-light'">
                    <img
                      v-if="currentTenant && currentTenant.logo"
                      :src="currentTenant.logo"
                      alt="logo"
                    />
                    <img v-else src="@/assets/img/logo.png" alt="logo" />
                  </div>
                  <div v-else>
                    <img
                      v-if="currentTenant && currentTenant.logo"
                      :src="currentTenant.logoDarkmode"
                      alt="logo"
                    />
                    <img v-else src="@/assets/img/logo-dark.png" alt="logo" />
                  </div>
                </div>
              </router-link>
            </div>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <nav class="px-2">
                <div
                  class="relative shadow-2xl mb-4"
                  v-click-outside="closeDropdownTenant"
                >
                  <span class="inline-block w-full rounded-md shadow-sm">
                    <button
                      v-on:click="dropDownTenantMobile = !dropDownTenantMobile"
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded="true"
                      aria-labelledby="listbox-label"
                      class="text-secondary cursor-default relative w-full border-gray-300 pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5 hover:bg-secondary rounded-md"
                    >
                      <span class="font-bold">{{ currentTenant.name }}</span>
                      <span
                        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-secondary"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </span>

                  <!-- Select popover, show/hide based on select state. -->
                  <div
                    class="transition-all duration-1000"
                    :class="
                      dropDownTenantMobile
                        ? 'z-40 absolute object-top mt-1 w-full rounded-md bg-gray-100 shadow-lg'
                        : 'hidden'
                    "
                  >
                    <ul
                      tabindex="-1"
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-item-3"
                      class="max-h-60 rounded-md py-1 text-sm leading-5 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                    >
                      <!--
                        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                        Highlighted: "text-primary bg-indigo-600", Not Highlighted: "text-gray-900"
                      -->
                      <li
                        v-for="(tenant, index) in myTenants"
                        :key="index"
                        id="listbox-option-0"
                        role="option"
                        class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-300 border-b border-gray-400"
                        v-on:click="changeTenant(tenant)"
                      >
                        <div>
                          <img
                            v-if="tenant.icon"
                            class="h-8 w-8 rounded-full overflow-hidden float-left mr-2 -ml-1 mt-1"
                            :src="tenant.icon"
                          />
                          <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                          <span class="font-medium">{{ tenant.name }}</span>
                          <span
                            v-if="tenant.apiKey === currentTenant.apiKey"
                            class="text-theme-600 absolute inset-y-0 right-0 flex items-center pr-4 -mt-4"
                          >
                            <svg
                              class="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                          <p class="text-xs">
                            {{ getPlanFromTenant(tenant) }} - ({{
                              tenant.memberCount
                            }})
                            <span v-if="tenant.memberCount === 1">
                              {{ $t("models.tenant.member") }}
                            </span>
                            <span v-else>
                              {{ $t("models.tenant.members") }}
                            </span>
                          </p>
                          <!--
                          Checkmark, only display for selected option.

                          Highlighted: "text-primary", Not Highlighted: "text-theme-600"
                          -->
                        </div>
                      </li>
                      <li
                        id="listbox-option-0"
                        role="option"
                        class="font-bold text-theme-800 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100 border-b border-gray-400"
                      >
                        <button class="font-bold" @click="addTenant">
                          {{ $t("settings.tenant.create") }}
                        </button>
                      </li>

                      <!-- More options... -->
                    </ul>
                  </div>
                </div>
                <div v-for="(group, index) in getMenu" :key="index">
                  <div class="mt-2">
                    <h3
                      class="px-1 text-xs leading-4 font-semibold text-theme-600 uppercase tracking-wider"
                      id="Settings-headline"
                    >
                      {{ group.title }}
                    </h3>
                  </div>
                  <div v-for="(menuItem, index) in group.items" :key="index">
                    <div
                      class="hover:-translate-y-1 hover:scale-150"
                      v-if="!menuItem.items || menuItem.items.length === 0"
                    >
                      <router-link
                        @click.native="sidebarOpen = !sidebarOpen"
                        :to="menuItem.path"
                        class="-mx-2 mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-theme-100 hover:bg-theme-700 focus:outline-none focus:text-theme-200 focus:bg-theme-600 transition ease-in-out duration-150"
                        :class="
                          (menuItem.icon ? 'px-4 ' : '-ml-6 ') +
                            ($route.path === menuItem.path
                              ? 'text-theme-200 bg-theme-600'
                              : 'text-secondary')
                        "
                      >
                        <span
                          class="text-secondary mr-3 h-5 w-5 transition ease-in-out"
                        >
                          <i
                            v-if="menuItem.icon"
                            :class="'   fa fa-' + menuItem.icon + ' '"
                          ></i>
                        </span>

                        <!-- <svg
                    class="mr-4 h-5 w-5 text-secondary group-hover:text-secondary group-focus:text-secondary transition ease-in-out duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                        </svg>-->
                        {{ menuItem.title }}
                      </router-link>
                    </div>
                    <div v-else class="hover:-translate-y-1 hover:scale-150">
                      <div
                        v-on:click="toggleMenuItem(index)"
                        class="cursor-pointer -mx-2 mt-1 group flex items-center px-4 py-2 text-sm leading-5 rounded-sm text-secondary hover:text-theme-100 hover:bg-theme-700 focus:outline-none focus:text-theme-200 focus:bg-theme-600 transition ease-in-out duration-150"
                      >
                        <span
                          class="text-secondary mr-3 h-5 w-5 transition ease-in-out"
                        >
                          <i
                            v-if="menuItem.icon"
                            :class="'   fa fa-' + menuItem.icon + ' '"
                          ></i>
                        </span>
                        {{ menuItem.title }}
                        <!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-secondary" -->
                        <svg
                          :class="
                            menuItemIsExpanded(index)
                              ? 'rotate-90 ml-auto h-3 w-3 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150'
                              : 'ml-auto h-3 w-3 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150'
                          "
                          class="hover:bg-theme-900 ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                        </svg>
                      </div>
                      <!-- Expandable link section, show/hide based on state. -->
                      <div class="mt-1" v-if="menuItemIsExpanded(index)">
                        <router-link
                          @click.native="sidebarOpen = !sidebarOpen"
                          v-for="(subItem, index) in menuItem.items"
                          :key="index"
                          :to="subItem.path"
                          class="-mx-2 pl-12 mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-theme-100 hover:bg-theme-700 focus:outline-none focus:text-theme-200 focus:bg-theme-600 transition ease-in-out duration-150"
                          :class="
                            (subItem.icon ? 'px-4 ' : '-mx-6 ') +
                              ($route.path === subItem.path
                                ? 'text-theme-200 bg-theme-600'
                                : 'text-secondary')
                          "
                        >
                          <span class="mr-1 h-5 w-5 transition ease-in-out">
                            <i
                              v-if="subItem.icon"
                              :class="'   fa fa-' + subItem.icon + ' '"
                            ></i>
                          </span>
                          {{ subItem.title }}
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div class="flex-shrink-0 w-14">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </div>

      <!-- Static sidebar for desktop -->
      <div
        :class="
          sidebarOpen
            ? 'hidden transition ease-in duration-1000'
            : 'hidden md:flex md:flex-shrink-0 border-r-2 border-theme-300  transition ease-out duration-1000'
        "
      >
        <div class="flex flex-col w-64">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div class="flex flex-col h-0 flex-1 shadow-md">
            <div
              v-if="currentTenant && currentTenant.logo"
              class="flex items-center h-16 flex-shrink-0 px-4 bg-primary"
            >
              <router-link to="/app">
                <!-- <logo class="w-56 text-left mr-auto p-12"></logo> -->
                <div class="w-7/12 text-left mx-auto">
                  <div v-if="$store.state.theme.appTheme === 'theme-bg-light'">
                    <img
                      v-if="currentTenant && currentTenant.logo"
                      :src="currentTenant.logo"
                      alt="logo"
                    />
                    <img v-else src="@/assets/img/logo.png" alt="logo" />
                  </div>
                  <div v-else>
                    <img
                      v-if="currentTenant && currentTenant.logo"
                      :src="currentTenant.logoDarkmode"
                      alt="logo"
                    />
                    <img v-else src="@/assets/img/logo-dark.png" alt="logo" />
                  </div>
                </div>
              </router-link>
            </div>
            <div class="flex-1 flex flex-col overflow-y-auto">
              <nav class="flex-1 px-2 py-4 bg-primary">
                <div
                  class="relative shadow-2xl mb-4"
                  v-click-outside="closeDropdownTenantDesktop"
                >
                  <span class="inline-block w-full rounded-md shadow-sm">
                    <button
                      class="bg-primary truncate text-secondary cursor-pointer w-full pl-3 py-2 text-left focus:outline-none hover:bg-gray-800 transition ease-in-out duration-150 sm:text-sm sm:leading-5 hover:bg-secondary hover:text-primary rounded-md shadow-sm"
                      v-on:click="
                        dropDownTenantDesktop = !dropDownTenantDesktop
                      "
                    >
                      <span class="font-bold">
                        <img
                          v-if="currentTenant.icon"
                          class="h-6 w-6 rounded-full overflow-hidden float-left mr-2 -ml-1"
                          :src="currentTenant.icon"
                        />
                        <span class="mt-4 text-xs">
                          {{ currentTenant.name }}
                        </span>
                      </span>
                      <span
                        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-secondary"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </span>

                  <!-- Select popover, show/hide based on select state. -->
                  <div
                    class="transition-all duration-1000"
                    :class="
                      dropDownTenantDesktop
                        ? 'z-40 absolute object-top mt-1 w-full rounded-md bg-gray-100 shadow-lg'
                        : 'hidden'
                    "
                  >
                    <ul
                      tabindex="-1"
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-item-3"
                      class="max-h-60 rounded-md py-1 text-sm leading-5 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                    >
                      <!--
                        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                        Highlighted: "text-primary bg-indigo-600", Not Highlighted: "text-gray-900"
                      -->
                      <li
                        v-for="(tenant, index) in myTenants"
                        :key="index"
                        id="listbox-option-0"
                        role="option"
                        class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-300 border-b border-gray-400"
                        v-on:click="changeTenant(tenant)"
                      >
                        <div>
                          <img
                            v-if="tenant.icon"
                            class="h-8 w-8 rounded-full overflow-hidden float-left mr-2 -ml-1 mt-1"
                            :src="tenant.icon"
                          />
                          <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                          <span class="font-medium">{{ tenant.name }}</span>
                          <span
                            v-if="tenant.apiKey === currentTenant.apiKey"
                            class="text-theme-600 absolute inset-y-0 right-0 flex items-center pr-4 -mt-4"
                          >
                            <svg
                              class="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                          <p class="text-xs">
                            {{ getPlanFromTenant(tenant) }} - ({{
                              tenant.memberCount
                            }})
                            <span v-if="tenant.memberCount === 1">
                              {{ $t("models.tenant.member") }}
                            </span>
                            <span v-else>
                              {{ $t("models.tenant.members") }}
                            </span>
                          </p>
                          <!--
                          Checkmark, only display for selected option.

                          Highlighted: "text-primary", Not Highlighted: "text-theme-600"
                          -->
                        </div>
                      </li>
                      <li
                        id="listbox-option-0"
                        role="option"
                        class="font-bold text-theme-800 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100 border-b border-gray-400"
                      >
                        <button class="font-bold" @click="addTenant">
                          {{ $t("settings.tenant.create") }}
                        </button>
                      </li>

                      <!-- More options... -->
                    </ul>
                  </div>
                </div>
                <div v-for="(group, index) in getMenu" :key="index">
                  <div class="mt-2">
                    <h3
                      class="px-1 text-xs leading-4 font-semibold text-theme-600 uppercase tracking-wider"
                      id="Settings-headline"
                    >
                      {{ group.title }}
                    </h3>
                  </div>
                  <div v-for="(menuItem, index) in group.items" :key="index">
                    <div
                      class="hover:-translate-y-1 hover:scale-150"
                      v-if="!menuItem.items || menuItem.items.length === 0"
                    >
                      <router-link
                        :to="menuItem.path"
                        class="-mx-2 mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-theme-100 hover:bg-theme-700 focus:outline-none focus:text-theme-200 focus:bg-theme-600 transition ease-in-out duration-150"
                        :class="
                          (menuItem.icon ? 'px-4 ' : '-ml-6 ') +
                            ($route.path === menuItem.path
                              ? 'text-theme-200 bg-theme-600'
                              : 'text-secondary')
                        "
                      >
                        <span
                          class="text-secondary mr-3 h-5 w-5 transition ease-in-out"
                        >
                          <i
                            v-if="menuItem.icon"
                            :class="'   fa fa-' + menuItem.icon + ' '"
                          ></i>
                        </span>

                        <!-- <svg
                    class="mr-4 h-5 w-5 text-secondary group-hover:text-secondary group-focus:text-secondary transition ease-in-out duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                        </svg>-->
                        {{ menuItem.title }}
                      </router-link>
                    </div>
                    <div v-else class="hover:-translate-y-1 hover:scale-150">
                      <div
                        v-on:click="toggleMenuItem(index)"
                        class="cursor-pointer -mx-2 mt-1 group flex items-center px-4 py-2 text-sm leading-5 rounded-sm text-secondary hover:text-theme-100 hover:bg-theme-700 focus:outline-none focus:text-theme-200 focus:bg-theme-600 transition ease-in-out duration-150"
                      >
                        <span
                          class="text-secondary mr-3 h-5 w-5 transition ease-in-out"
                        >
                          <i
                            v-if="menuItem.icon"
                            :class="'   fa fa-' + menuItem.icon + ' '"
                          ></i>
                        </span>
                        {{ menuItem.title }}
                        <!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-secondary" -->
                        <svg
                          :class="
                            menuItemIsExpanded(index)
                              ? 'rotate-90 ml-auto h-3 w-3 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150'
                              : 'ml-auto h-3 w-3 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150'
                          "
                          class="hover:bg-theme-900 ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                        </svg>
                      </div>
                      <!-- Expandable link section, show/hide based on state. -->
                      <div class="mt-1" v-if="menuItemIsExpanded(index)">
                        <router-link
                          v-for="(subItem, index) in menuItem.items"
                          :key="index"
                          :to="subItem.path"
                          class="-mx-2 pl-12 mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-theme-100 hover:bg-theme-700 focus:outline-none focus:text-theme-200 focus:bg-theme-600 transition ease-in-out duration-150"
                          :class="
                            (subItem.icon ? 'px-4 ' : '-mx-6 ') +
                              ($route.path === subItem.path
                                ? 'text-theme-200 bg-theme-600'
                                : 'text-secondary')
                          "
                        >
                          <span class="mr-1 h-5 w-5 transition ease-in-out">
                            <i
                              v-if="subItem.icon"
                              :class="'   fa fa-' + subItem.icon + ' '"
                            ></i>
                          </span>
                          {{ subItem.title }}
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-0 flex-1 overflow-hidden">
        <div class="relative flex-shrink-0 flex h-16 bg-white shadow">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600"
            aria-label="Open sidebar"
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>

          <div class="flex-1 px-4 flex justify-between">
            <div class="flex-1 flex">
              <!-- Search -->
              <div class="w-full flex md:ml-0">
                <div class="align-baseline w-full text-secondary pt-5 pl-1">
                  <breadcrumb></breadcrumb>
                </div>
              </div>
            </div>
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <div class="ml-3 relative" v-click-outside="closeDropdownUser">
                <div>
                  <button
                    v-on:click="dropDownUser = !dropDownUser"
                    class="p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <img
                      v-if="avatar"
                      class="h-8 w-8 rounded-md"
                      :src="avatar"
                      alt
                    />
                    <span
                      v-else
                      class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-theme-500 shadow-xl"
                    >
                      <span
                        class="text-sm font-medium leading-none text-white"
                        >{{ avatarText }}</span
                      >
                    </span>
                    <!-- <i class="fa fa-user rounded-full" /> -->
                  </button>
                </div>
                <!--
              Profile dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
                -->
                <div
                  v-if="dropDownUser"
                  class="z-40 transition duration-500 ease-in-out origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                >
                  <div
                    class="py-1 rounded-md bg-white shadow-xs"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <router-link
                      v-if="isAdmin"
                      to="/admin"
                      class="truncate group flex items-center px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-100 transition ease-in-out duration-150"
                      role="menuitem"
                      >{{ $t("admin.title") }}</router-link
                    >

                    <!-- <a
                      class="truncate group flex items-center px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-100 transition ease-in-out duration-150"
                      role="menuitem"
                    >
                      {{
                      activeProduct
                      ? activeProduct.title
                      : $t("shared.noSubscription")
                      }}
                    </a>-->
                    <a
                      class="truncate group flex items-center px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-100 transition ease-in-out duration-150"
                      role="menuitem"
                      >{{ profileName }}</a
                    >
                    <a
                      class="truncate group flex items-center px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-100 transition ease-in-out duration-150"
                      role="menuitem"
                      >{{ roleName }} {{ $t("shared.of") }}
                      {{ currentTenant.name }}</a
                    >
                    <div class="border-t border-gray-300"></div>

                    <router-link
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition ease-in-out duration-150"
                      role="menuitem"
                      @click.native="closeDropdownUser"
                      to="/app/settings/organization"
                      >{{ $t("app.navbar.tenant") }}</router-link
                    >
                    <router-link
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition ease-in-out duration-150"
                      role="menuitem"
                      @click.native="closeDropdownUser"
                      to="/app/settings/profile"
                      >{{ $t("app.navbar.profile") }}</router-link
                    >
                    <div class="border-t border-gray-300"></div>

                    <button
                      @click="logout"
                      class="text-left w-full block px-4 py-2 text-sm text-red-700 hover:bg-red-100 transition ease-in-out duration-150"
                      role="menuitem"
                    >
                      {{ $t("app.navbar.signOut") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main class="flex-1 overflow-y-auto focus:outline-none" tabindex="0">
          <tenant-subscription-status></tenant-subscription-status>
          <div class="pt-2 pb-40 md:py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <!-- Replace with your content -->

              <slot></slot>
              <!-- /End replace -->
            </div>
          </div>
          <tenant-new
            v-show="addingTenant"
            v-on:close="addingTenant = false"
            v-on:created="createdTenant"
          ></tenant-new>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters } from "vuex";
import { appSidebar } from "../../app/sidebar/appSidebar";
import { adminSidebar } from "../../app/sidebar/adminSidebar";
import TenantNew from "@/components/app/settings/tenant/TenantNew.vue";
import TenantSubscriptionStatus from "@/components/app/settings/tenant/subscription/TenantSubscriptionStatus.vue";
import Breadcrumb from "./Breadcrumb.vue";
import { SignalService } from "../../plugins/SignalR";
import { UserType } from "../../app/models/system/account/IUserDTO";
import { Prop } from "vue-property-decorator";
import { SideBarItem } from "../../app/sidebar/SidebarItem";
import routes from "../../router/routes";
import { RouteConfig } from "vue-router";
import { StripeProduct } from "../../app/models/subscription/StripeProduct";
import { JsonHubProtocol } from "@aspnet/signalr";
import { ITenantDTO } from "../../app/models/system/account/ITenantDTO";
import { tenantService } from "../../services/system/TenantService";

@Component({
  components: { TenantNew, TenantSubscriptionStatus, Breadcrumb },
  computed: {
    ...mapGetters("account", {
      profileName: "profileName",
      avatarText: "avatarText",
      avatar: "avatar",
      isAdmin: "isAdmin",
    }),
    ...mapGetters("theme", {
      appTheme: "appTheme",
      appColor: "appColor",
    }),
    ...mapGetters("tenant", {
      activeProduct: "activeProduct",
      roleName: "roleName",
    }),
  },
})
export default class AppLayoutComponent extends Vue {
  @Prop()
  public layout!: string;
  private adminTheme: string = "";
  private sidebarOpen: boolean = false;
  private dropDownTenantMobile: boolean = false;
  private dropDownTenantDesktop: boolean = false;
  private dropDownUser: boolean = false;
  private menu: SideBarItem[] = [];
  private expanded: number[] = [];
  private addingTenant: boolean = false;
  mounted() {
    if (this.layout === "admin") {
      this.menu = adminSidebar;
      this.$store.commit("theme/appTheme", "theme-bg-dark");
      this.$store.commit("theme/appColor", "theme-indigo");
    } else {
      this.menu = appSidebar;
      this.$store.commit("theme/appTheme", this.$store.state.tenant.appTheme);
      this.$store.commit("theme/appColor", this.$store.state.tenant.appColor);
    }
    this.menu.forEach((group) => {
      group.items?.forEach((element, index) => {
        if (element.open) {
          this.expanded.push(index);
        } else {
          this.expanded = this.expanded.filter((f) => f !== index);
        }
      });
    });
    this.showConversations();

    if (!this.myTenants || this.myTenants.length === 0) {
      tenantService.getMyTenants();
    }

    SignalService.on("UserConnected", (message) => {
      // alert(message);
    });
  }
  showConversations() {
    // @ts-ignore
    if (this.$intercom) {
      // @ts-ignore
      // this.$intercom.boot({
      //   user_id: this.$store.state.account.user.id,
      //   name: this.$store.state.account.user.firstName,
      //   email: this.$store.state.account.user.email,
      // });
      // @ts-ignore
      // this.$intercom.show();
    }
    // @ts-ignore
    if (this.$drift) {
      // @ts-ignore
      // this.$drift.identify(this.$store.state.account.user.id, {
      //   name: this.$store.state.account.user.firstName,
      //   email: this.$store.state.account.user.email,
      // });
      // @ts-ignore
      // this.$drift.show();
    }
  }
  logout() {
    this.$store.dispatch("auth/logout");
  }
  changeTenant(tenant) {
    this.closeDropdownTenant();
    tenantService.changeDefault(tenant.apiKey).then((response: any) => {
      this.$store.commit("tenant/current", response.data.currentTenant);
      this.$router.go(0);
    });
  }
  closeDropdownUser() {
    this.dropDownUser = false;
  }
  closeSidebar() {
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }
  closeDropdownTenant() {
    this.dropDownTenantMobile = false;
  }
  closeDropdownTenantDesktop() {
    this.dropDownTenantDesktop = false;
  }
  toggleMenuItem(index) {
    if (this.expanded.includes(index)) {
      this.expanded = this.expanded.filter((item) => item !== index);
    } else {
      this.expanded.push(index);
    }
  }
  menuItemIsExpanded(index: number) {
    return this.expanded.includes(index);
  }
  translate(title) {
    const translated = this.$t(title.trim());
    return translated;
  }
  addTenant() {
    this.sidebarOpen = false;
    this.closeDropdownTenantDesktop();
    this.addingTenant = true;
  }
  createdTenant() {
    this.addingTenant = false;
  }

  addPricesToAdminSidebar(prices: SideBarItem) {
    prices.items = [];
    if (prices && this.products) {
      this.products.forEach((element: StripeProduct) => {
        const price: SideBarItem = {
          title: element.title,
          path: "/admin/products/" + element.uuid,
        };
        if (element.id && element.id > 0 && price) {
          prices.items?.push(price);
        }
      });
      if (prices.items.length > 0) {
        prices.items.unshift({
          title: this.$t("shared.all"),
          path: "/admin/products",
        });
        prices.open = true;
      }
    }
  }
  addToBreadcrumb(items: any, route: RouteConfig) {
    if (route.path !== this.$route.path) {
      if (!items.some((f) => f.link === route.path)) {
        items.push({
          name: route.meta?.title ?? "Untitled",
          link: route.path,
        });
      }
    }
  }
  getPlanFromTenant(tenant: ITenantDTO): string {
    if (
      tenant.products &&
      tenant.products.length > 0 &&
      tenant.products[0].product
    ) {
      return tenant.products[0].product.title;
    } else {
      if (tenant.subdomain === "admin") {
        return "Admin";
      } else {
        return this.$t("settings.tenant.subscription.notSubscribed").toString();
      }
    }
  }
  get products(): StripeProduct[] {
    return this.$store.state.pricing.products as StripeProduct[];
  }
  get myTenants() {
    return this.$store.state.tenant.tenants;
  }
  get currentTenant() {
    return this.$store.state.tenant.current ?? { name: "Undefinded" };
  }
  get currentUserType(): UserType {
    return this.$store.state.account.user.type as UserType;
  }
  get getMenu() {
    if (this.layout === "admin" && this.menu.length > 0 && this.menu[0].items) {
      const prices: SideBarItem | undefined = this.menu[0].items.find(
        (f) => f.path === "/admin/products"
      );
      if (prices) {
        prices.items = [];
        this.addPricesToAdminSidebar(prices);
      }
    }
    const menu = this.menu.filter(
      (f) =>
        (!f.userTypes || f.userTypes.includes(this.currentUserType)) &&
        f.items?.find(
          (x) => !x.userTypes || x.userTypes.includes(this.currentUserType)
        )
    );
    return menu;
  }
}
</script>
