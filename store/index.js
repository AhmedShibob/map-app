/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
export const state = () => ({
  selectedBuilding: undefined,
  selectedUser: undefined,
  list: [
    {
      id: '1',
      name: 'Ahmed Shibob',
      buildings: [
        {
          id: 22,
          buildingName: 'Burj Khalifa',
          location: {
            id: 'AFG',
            name: 'Afghanistan',
            position: [34.79120620588236, 67.78638470588234],
          },
        },
      ],
    },
    {
      id: '2',
      name: 'Leona Mullen',
      buildings: [
        {
          id: 66,
          buildingName: 'Hallow Tower',
          location: {
            "id": "CHN",
            "name": "China",
            "position": [36.60488268907564, 105.93390225630252]
          },
        },
      ],
    },
    {
      id: '3',
      name: 'Zayd Brock',
      buildings: [
        {
          id: 89,
          buildingName: 'Epiphany Lookout',
          location: {
            "id": "BLZ",
            "name": "Belize",
            "position": [17.396577526315788, -88.60339900000001]
          },
        },
      ],
    },
    {
      id: '4',
      name: 'Tanzi Jonas',
      buildings: [
        {
          id: 78,
          buildingName: 'Wolf Lake Tower',
          location: {
            "id": "USA",
            "name": "United States of America",
            "position": [45.1724660806452, -120.68130862903226]
          },
        },
      ],
    },
  ],
})

export const mutations = {
  add(state, payload) {

    const user = state.list.find(user => user.id  === payload.userId)
    

    user.buildings.push(
      {
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
        buildingName: payload.buildingName,
        location: payload.location
      },
    )


    state.selectedBuilding = user.buildings[user.buildings.length - 1]


    this.$router.push('/')

  },
  edit(state, payload) {
    const user = state.list.find(user => user.id  === payload.userId)
    // eslint-disable-next-line eqeqeq
    const buiding = user.buildings.find(building => (building.id) == (payload.buildingId))
    

    if (buiding) {

    buiding.buildingName = payload.buildingName
    buiding.location = payload.location
    }
    

    state.selectedBuilding = buiding
    this.$router.push('/')

  },
  selectedUser(state, user) {
    state.selectedUser = user
  },
  selectedBuilding(state, buiding) {
    state.selectedBuilding = buiding
  }
}

export const getters = {
  getSelectedUser({ selectedUser }) {
    return selectedUser
  },
  getterList({ list }) {
    return list
  },
  getterBuilding({selectedBuilding}) {
    return selectedBuilding
  }
}
