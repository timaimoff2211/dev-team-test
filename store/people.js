export const state = () => ({
  people: [],
  pagination: {
    perPage: 20,
    page: 1
  },
  person: null
})

export const getters = {
  getPeopleList: s => s.people,
  getPagination: s => s.pagination,
  getPerson: s => s.person
}

export const mutations = {
  SET_PEOPLE(state, list) {
    state.people = list
  },
  SET_PAGINATION_DATA(state, pagData) {
    state.pagination = pagData
  },
  SET_PERSON(state, person) {
    state.person = person
  }
}

export const actions = {
  async fetchPeopleList({commit, state}) {
    try {
      const res = await this.$axios.get(`people?pp=${state.pagination.perPage}&p=${state.pagination.page}`)
      commit('SET_PEOPLE', res.data)
    } catch (error) {
      console.log(error.response);
      this.app.$toast.error('Error! Something went wrong...')
    }
  },
  async fetchPerson(ctx, id) {
    try {
      const res = await this.$axios.get(`people/${id}`)
      ctx.commit('SET_PERSON', res.data)
      return res;
    } catch (error) {
      return error.response
    }
  }
}