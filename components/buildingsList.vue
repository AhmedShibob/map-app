<template>
  <div class="w-full bg-white rounded-lg shadow-lg lg:w-full">
    <ul class="divide-y-2 divide-gray-100">
      <li
        v-for="(building,i) in getSelectedUser.buildings"
        :key="building.id"
        @click="selectedBuilding(building)"
        class="p-3 hover:bg-blue-600 hover:text-blue-200 rounded-lg  group"
      >
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0 w-10 h-10">
              <img
                class="w-full h-full rounded-full"
                :src="`https://picsum.photos/200/300?random=`+i"
                alt=""
              />
            </div>
            <div class="ml-3">
              <p class="text-gray-900 group-hover:text-blue-200 cursor-pointer text-lg whitespace-no-wrap">{{building.buildingName}}</p>
            </div>
          </div>

          <div class="flex">
          
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-blue-600 group-hover:text-blue-200 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              @click="$router.push(`user/${getSelectedUser.id}/${building.id}`)"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {  mapGetters, mapMutations } from 'vuex'

export default {
   computed: {
    ...mapGetters(['getSelectedUser',]),
  },
  methods: {
     ...mapMutations({
      selectedBuilding: 'selectedBuilding',
    }),
  }
}
</script>

<style lang="scss" scoped>
</style>