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
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-bold text-gray-900">
                      {{
                        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                          timesheet.billableAmount,
                        )
                      }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!--Pagination-->
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button
                  @click="previousPage"
                  :disabled="this.pagination.page === 1"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="this.pagination.page === this.pagination.totalPages"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                >
                  Next
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">{{ this.timesheetCount }}</span>
                    of
                    <span class="font-medium">{{ this.pagination.count }}</span>
                    results
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      @click="previousPage"
                      :disabled="this.pagination.page === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span class="sr-only">Previous</span>
                      <!-- Heroicon name: solid/chevron-left -->
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <template v-for="(n, index) in this.pagination.totalPages">
                      <button
                        :key="index"
                        @click="getPage(n)"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {{ n }}
                      </button>
                    </template>
                    <button
                      @click="nextPage"
                      :disabled="this.pagination.page === this.pagination.totalPages"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span class="sr-only">Next</span>
                      <!-- Heroicon name: solid/chevron-right -->
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'TimesheetTable',
  data() {
    return {
      headers: ['Name', 'Clients', 'Hours', 'Billable Hours', 'Billable Amount'],
      limit: 25,
    };
  },
  computed: {
    ...mapState({
      timesheets: (state) => state.timesheets,
      pagination: (state) => state.pagination,
    }),
    ...mapGetters({
      timesheetCount: 'timesheetCount',
    }),
  },
  created() {
    if (Object.keys(this.timesheets).length === 0) {
      this.getTimesheets({ page: 1, limit: this.limit });
    }
  },
  methods: {
    ...mapActions({ getTimesheets: 'getTimesheets' }),
    nextPage() {
      this.getTimesheets({
        page: this.pagination.page + 1,
        limit: this.limit,
      });
    },
    getPage(index) {
      this.getTimesheets({
        page: index,
        limit: this.limit,
      });
    },
    previousPage() {
      this.getTimesheets({
        page: this.pagination.page - 1,
        limit: this.limit,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
