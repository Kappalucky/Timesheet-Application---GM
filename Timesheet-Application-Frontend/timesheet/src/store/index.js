import Vue from 'vue';
import Vuex from 'vuex';

import api from '../services/API';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {},
  state: {
    timesheets: [],
    pagination: {
      previous: '',
      next: '',
      page: 1,
      limit: 25,
      totalPages: 0,
    },
    count: '',
    billableAmount: '',
    totalHours: '',
    errors: {},
  },
  mutations: {
    ADD_TIMESHEETS(state, timesheets) {
      state.timesheets = timesheets;
    },
    ADD_COUNT(state, count) {
      state.pagination.count = count;
    },
    ADD_TOTAL_PAGES(state, totalPages) {
      state.pagination.totalPages = totalPages;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
    ADD_NEXT(state, next) {
      state.pagination.next = next;
    },
    ADD_PREVIOUS(state, previous) {
      state.pagination.previous = previous;
    },
    ADD_TOTAL_HOURS(state, totalHours) {
      state.totalHours = totalHours;
    },
    ADD_TOTAL_BILLABLE_AMOUNT(state, billableAmount) {
      state.billableAmount = billableAmount;
    },
    NEW_TIMESHEET(state, timesheet) {
      state.timesheets.push(timesheet);
    },
    ADD_ERROR(state, payload) {
      state.errors = payload;
    },
    CLEAR_ERROR(state) {
      state.errors = {};
    },
  },
  actions: {
    newTimesheet({ dispatch, commit }, params) {
      return new Promise((resolve, reject) => {
        api
          .post('/timesheets/', {
            firstName: params.firstName,
            lastName: params.lastName,
            client: params.client,
            project: params.project,
            projectCode: params.projectCode,
            hours: params.hours,
            billable: params.billable,
            billableRate: params.billableRate,
            date: params.date,
          })
          .then((response) => {
            dispatch('getTimesheets', { page: 1, limit: 10 });
            resolve(response);
          })
          .catch((error) => {
            const e = error.message;
            commit('ADD_ERROR', e);
            reject(e);
          });
      });
    },
    getTimesheets({ commit, dispatch }, { page, limit }) {
      return new Promise((resolve, reject) => {
        let endpoint = 'timesheets';

        // Check if 'page' is the only variable
        if (page) {
          endpoint = `${endpoint}?page=${page}`;
        }

        // Check if 'limit' is also included. Append to end of page endpoint
        if (limit) {
          endpoint = `${endpoint}&limit=${limit}`;
        }

        api
          .get(endpoint)
          .then((response) => {
            if (response.data.results) {
              const timesheets = response.data.results;
              commit('SET_PAGINATION', {
                previous: response.data.links.previous,
                next: response.data.links.next,
                totalPages: response.data.totalPages,
                count: response.data.count,
                limit,
                page,
              });
              commit('ADD_TIMESHEETS', timesheets);
            } else {
              const timesheets = response.data;
              commit('ADD_TIMESHEETS', timesheets);
            }

            commit('CLEAR_ERROR', null);
            dispatch('getTotalHours');
            dispatch('getTotalBillableAmount');
            resolve(response);
          })
          .catch((error) => {
            const e = error.message;
            commit('ADD_ERROR', e);
            reject(e);
          });
      });
    },
    getTotalHours({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get('/timesheets/total_hours/')
          .then((response) => {
            const { totalHours } = response.data;
            commit('ADD_TOTAL_HOURS', totalHours);
            resolve(response);
          })
          .catch((error) => {
            const e = error.message;
            commit('ADD_ERROR', e);
            reject(e);
          });
      });
    },
    getTotalBillableAmount({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get('/timesheets/total_billable_amount/')
          .then((response) => {
            const billableAmount = response.data;
            commit('ADD_TOTAL_BILLABLE_AMOUNT', billableAmount);
            resolve(response);
          })
          .catch((error) => {
            const e = error.message;
            commit('ADD_ERROR', e);
            reject(e);
          });
      });
    },
  },
  getters: {
    timesheetCount: (state) => state.timesheets.length,
  },
});

export default store;
