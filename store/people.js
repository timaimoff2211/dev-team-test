export const state = () => ({
  people: [],
  pagination: {
    perPage: 20,
    page: 1
  }
})

export const getters = {
  getPeopleList: s => s.people,
  getPagination: s => s.pagination
}

export const mutations = {
  SET_PEOPLE(state, list) {
    state.people = list
  },
  SET_PAGINATION_DATA(state, pagData) {
    state.pagination = pagData
  }
}

export const actions = {
  async fetchPeopleList({commit, state}) {
    try {
      const res = await this.$axios.get(`people?pp=${state.pagination.perPage}&p=${state.pagination.page}`)
      commit('SET_PEOPLE', res.data)
    } catch (error) {
      console.log(error.response);
      this.$toast.error('Error! Something went wrong...')
    }
  }
}