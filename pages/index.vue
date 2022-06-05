<template>
  <div
    class="
      bg-gradient-to-r
      from-pink-300
      via-purple-300
      to-indigo-400
      h-screen
      p-20
    "
  >
    <div
      class="
        flex
        justify-center
        items-center
        h-full
        w-full
        bg-white
        rounded-3xl
        p-10
      "
    >
      <div class="flex flex-wrap overflow-hidden w-full h-full rounded-3xl">
        <div class="w-2/3 overflow-hidden bg-gray-50">
          <div id="map-wrap" style="height: 100vh">
            <client-only>
              <l-map
                :zoom="3.4"
                :center="
                  getterBuilding && getterBuilding.location.position
                    ? getterBuilding.location.position
                    : [28.212732317073176, 31.432993658536578]
                "
              >
                <l-tile-layer
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                ></l-tile-layer>

              
                <l-marker
                  v-if="getterBuilding && getterBuilding.location.position"
                
                  :lat-lng="getterBuilding.location.position"
                >
                  <l-tooltip>{{getterBuilding.buildingName}}</l-tooltip>
                </l-marker>
              </l-map>
            </client-only>
          </div>
        </div>

        <div class="w-1/3 overflow-hidden pl-10 relative h-full">
          <div class="z-50 flex flex-row justify-between pt-10">
            <div class="flex flex-col w-full">
              <p class="text-sm text-left">User</p>
              <div class="relative inline-block pt-1 text-left w-full">
                <div class="w-full">
                  <button
                    id="menu-button"
                    type="button"
                    class="
                      inline-flex
                      w-full
                      justify-between
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-gray-700
                      bg-white
                      border border-gray-800
                      rounded-md
                      shadow-sm
                      hover:bg-gray-50
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-offset-gray-100
                      focus:ring-indigo-500
                    "
                    aria-expanded="true"
                    aria-haspopup="true"
                    @click="userDropDown = !userDropDown"
                  >
                    {{
                      getSelectedUser && getSelectedUser.name
                        ? getSelectedUser.name
                        : 'select user'
                    }}
                    <svg
                      class="w-5 h-5 ml-2 -mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <transition name="expand">
                  <div
                    v-if="userDropDown"
                    class="
                      absolute
                      right-0
                      mt-2
                      origin-top-right
                      bg-white
                      divide-y divide-gray-100
                      rounded-md
                      shadow-lg
                      w-full
                      ring-1 ring-black ring-opacity-5
                      focus:outline-none
                      z-40
                    "
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                  >
                    <div class="py-1" role="none">
                      <div
                        v-for="(user, i) in getterList"
                        :id="`menu-item-${i}`"
                        :key="i"
                        :class="
                          getSelectedUser == user
                            ? ' bg-gray-200 p-1  '
                            : ' hover:bg-green-50 p-1 '
                        "
                        class="
                          block
                          px-4
                          py-2
                          text-sm text-gray-700
                          cursor-pointer
                        "
                        role="menuitem"
                        tabindex="-1"
                        @click=";(userDropDown = false), selectedUser(user)"
                      >
                        {{ user.name }}
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <div class="z-50 flex flex-row justify-between pt-10">
            <buildings-list v-if="getSelectedUser" />

            <skeleton-loader v-else />
          </div>

          <div
            class="
              z-50
              flex flex-1 flex-col
              justify-between
              absolute
              bottom-0
              w-full
              p-4
            "
          >
            <button
              v-if="getSelectedUser"
              type="button"
              class="
                text-white
                bg-blue-700
                hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-bold
                rounded-lg
                text-lg
                p-2.5
                inline-flex
                items-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                align-middle
                w-11/12
                text-center
                justify-center
              "
              @click="$router.push(`user/${getSelectedUser.id}/${null}`)"
            >
              Add Building
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  
  data() {
    return {
      userDropDown: false,
    }
  },
  computed: {
    ...mapGetters(['getSelectedUser', 'getterList', 'getterBuilding']),
  },
  methods: {
    ...mapMutations({
      selectedUser: 'selectedUser',
    }),
  },
}
</script>
