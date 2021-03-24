import Vue from 'vue';
import Vuex from 'vuex';

import api from '../services/API';

console.log(api);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timesheets: [],
    billableAmount: '',
    totalHours: '',
  },
  mutations: {
    ADD_TIMESHEETS(state, timesheets) {
      state.timesheets = timesheets;
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
  },
  actions: {
    newTimesheet({ dispatch, commit }, params) {
      return new Promise((resolve, reject) => {
        console.log(params);
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
            console.log('newTimesheet:', response);
            dispatch('getTimesheets');
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    getTimesheets({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        api
          .get('/timesheets/')
          .then((response) => {
            console.log('getTimesheets:', response);
            const timesheets = response.data;
            commit('ADD_TIMESHEETS', timesheets);
            dispatch('getTotalHours');
            dispatch('getTotalBillableAmount');
            resolve(response);
          })
          .catch((error) => {
            const e = error;
            console.log(error);
            reject(e);
          });
      });
    },
    getTotalHours({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get('/timesheets/total_hours/')
          .then((response) => {
            console.log('getTotalHours:', response);
            const { totalHours } = response.data;
            commit('ADD_TOTAL_HOURS', totalHours);
            resolve(response);
          })
          .catch((error) => {
            const e = error;
            console.log(error);
            reject(e);
          });
      });
    },
    getTotalBillableAmount({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get('/timesheets/total_billable_amount/')
          .then((response) => {
            console.log('getTotalBillableAmount:', response);
            const billableAmount = response.data;
            commit('ADD_TOTAL_BILLABLE_AMOUNT', billableAmount);
            resolve(response);
          })
          .catch((error) => {
            const e = error;
            console.log(error);
            reject(e);
          });
      });
    },
  },
  modules: {},
});
