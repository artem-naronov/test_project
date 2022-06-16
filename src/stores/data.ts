import { defineStore } from 'pinia'

export const useDataStore = defineStore({
  id: 'data',
  state: () => ({
    data: [],
    editItem: NaN,
    idList: 0,
    showModal: false,
    addModal: false,
    editModal: false,
    sortList: []
  }),
  getters: {
    // doubleCount: (state) => state.data * 2
  },
  actions: {
    add( value:never) {
      this.data.splice(this.data.length, 0, value)
    },
    edit(value:never) {
      this.data.splice(this.editItem, 1, value)
    },
    listSort(param:never) {
      if(param == '') {
        this.sortList = this.data
      } else {
        this.sortList = this.data.filter((item:any) => item.id == param || item.desc.includes(param))
      }
    }
  }
})
