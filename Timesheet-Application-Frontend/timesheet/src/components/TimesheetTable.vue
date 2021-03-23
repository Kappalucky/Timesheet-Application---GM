<template>
  <div class="timesheet container mx-auto my-4 py-4">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <template>
                  <tr>
                    <th
                      v-for="header in headers"
                      :key="header.index"
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </template>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="timesheet in timesheets" :key="timesheet.index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-blue-500">{{ timesheet.project }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-blue-500">{{ timesheet.client }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-blue-500">{{ timesheet.hours }}</div>
                  </td>
                  <!--If object is billable then billable hours is 100% else it is 0 -->
                  <td class="px-6 py-4 inline-flex whitespace-nowrap">
                    <template v-if="timesheet.billable">
                      <div class="text-sm text-gray-900">{{ timesheet.hours }}</div>
                      <p class="text-sm text-gray-400 ml-2 pr-2">(100%)</p>
                    </template>
                    <template v-else>
                      <div class="text-sm text-gray-900">0.00</div>
                      <p class="text-sm text-gray-400 ml-2 pr-2">(0%)</p>
                    </template>
                  </td>
                  <!--If object is billable then billable amount is returned else it is $0 -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-bold text-gray-900">$538.00</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TimesheetTable',
  data() {
    return {
      headers: ['Name', 'Clients', 'Hours', 'Billable Hours', 'Billable Amount'],
    };
  },
  computed: {
    ...mapState({
      timesheets: (state) => state.timesheets,
    }),
  },
  methods: {
    ...mapActions({ getTimesheets: 'getTimesheets' }),
  },
  created() {
    if (Object.keys(this.timesheets).length === 0) {
      this.getTimesheets();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
