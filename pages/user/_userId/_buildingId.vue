/* eslint-disable eqeqeq */
/* eslint-disable eqeqeq */
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
      <div class="w-1/3 bg-gray-50 p-8 rounded-3xl">
        <div class="flex flex-col w-full mb-4">
          <div class="flex flex-col relative">
            <div class="text-base font-medium text-gray-700">Name</div>
            <div class="relative flex items-center shadow-xs h-10">
              <input
                v-model="buildingName"
                type="text"
                class="
                  px-4
                  py-2
                  w-full
                  h-full
                  text-base
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
                  disabled:bg-gray-50
                "
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full mb-8">
          <p class="text-base font-medium text-gray-700">City</p>
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
                  text-base
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
                @click="citiesDropDown = !citiesDropDown"
              >
                <span class="mt-1">
                  {{
                    selectedCity && selectedCity.name
                      ? selectedCity.name
                      : 'select city'
                  }}
                </span>

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
                v-if="citiesDropDown"
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
                  h-96
                  overflow-y-scroll
                "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <div
                    v-for="(city, i) in countriesList"
                    :id="`menu-item-${i}`"
                    :key="i"
                    :class="
                      selectedCity && selectedCity.name == city.name
                        ? ' bg-gray-200 p-1  '
                        : ' hover:bg-green-50 p-1 '
                    "
                    class="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    role="menuitem"
                    tabindex="-1"
                    @click=";(citiesDropDown = false), (selectedCity = city)"
                  >
                    {{ city.name }}
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <button
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
              text-center
              hello
              justify-center
            "
            @click="addOrEditBuilding()"
          >
            {{ $route.params.buildingId !== 'null' ? 'Edit' : 'Add' }} Building
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import countriesList from '~/assets/data/countriesList.json'

export default {
  data() {
    return {
      citiesDropDown: false,
      countriesList,
      selectedCity: undefined,
      cityRequired: false,
      buildingName: '',
      buildingNameRequired: false,
    }
  },
  computed: {
    ...mapGetters(['getterList']),
  },
  mounted() {
    if (this.$route.params.buildingId !== 'null') {
      const user = this.getterList.find(
        (user) => user.id === this.$route.params.userId
      )


      const building = user.buildings.find(
        // eslint-disable-next-line eqeqeq
        (build) => build.id == this.$route.params.buildingId
      )


      if (building) {
        this.buildingName = building.buildingName

        this.selectedCity = building.location
      }
    } else {
      this.buildingName = ''

      this.selectedCity = undefined
    }
  },
  methods: {
    ...mapMutations({
      addBuildingToTheUser: 'add',
      editBuildingToTheUser: 'edit',
    }),
    addOrEditBuilding() {
      if (!this.selectedCity) this.cityRequired = true
      if (!this.buildingName) this.buildingNameRequired = true
      if (this.selectedCity && this.buildingName) {
        const payload = {
          userId: this.$route.params.userId,
          buildingId: this.$route.params.buildingId,
          buildingName: this.buildingName,
          location: this.selectedCity,
        }

        if (this.$route.params.buildingId !== 'null') {
          this.editBuildingToTheUser(payload)
        } else {
          this.addBuildingToTheUser(payload)
        }
      }
    },
  },
}
</script>
