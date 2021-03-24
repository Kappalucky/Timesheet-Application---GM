<template>
  <div class="home container mx-auto my-4 py-4">
    <div class="section-header">
      <page-header />
    </div>
    <div class="section-create">
      <!--Section button-->
      <div class="mt-5 flex lg:mt-0 lg:ml-4 justify-end">
        <span class="hidden sm:block">
          <button
            type="button"
            v-on:click="toggleModal()"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              class="-ml-1 mr-2 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              />
            </svg>
            New
          </button>
        </span>
      </div>
      <!--Modal-->
      <div v-show="modal" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">Create New Entry</h3>
                  <div class="mt-4">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          v-model="timesheet.firstName"
                          autocomplete="given-name"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
                        <input
                          type="text"
                          name="last_name"
                          id="last_name"
                          v-model="timesheet.lastName"
                          autocomplete="family-name"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                        />
                      </div>

                      <div class="col-span-6">
                        <label for="client" class="block text-sm font-medium text-gray-700">Client</label>
                        <input
                          type="text"
                          name="client"
                          id="client"
                          v-model="timesheet.client"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                        />
                      </div>

                      <div class="col-span-6">
                        <label for="project" class="block text-sm font-medium text-gray-700">Project</label>
                        <input
                          type="text"
                          name="project"
                          id="project"
                          v-model="timesheet.project"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="project_code" class="block text-sm font-medium text-gray-700">Project Code</label>
                        <input
                          type="text"
                          name="project_code"
                          id="project_code"
                          v-model="timesheet.projectCode"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          v-model="timesheet.date"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="hours" class="block text-sm font-medium text-gray-700">Hours</label>
                        <input
                          type="number"
                          name="hours"
                          id="hours"
                          step="any"
                          min="0"
                          max="999.99"
                          v-model="timesheet.hours"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="billable_rate" class="block text-sm font-medium text-gray-700">Billable Rate</label>
                        <input
                          type="number"
                          name="billable_rate"
                          id="billable_rate"
                          step="any"
                          min="0"
                          max="999.99"
                          v-model="timesheet.billableRate"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                      <div class="space-y-4">
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input
                              id="billable"
                              name="billable"
                              type="checkbox"
                              v-model="timesheet.billable"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="billable" class="font-medium text-gray-700">Billable</label>
                            <p class="text-gray-500">Billable amount will be defined by Hours and Billable Rate</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                v-on:click="createTimesheet()"
                class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Create
              </button>
              <button
                type="button"
                v-on:click="toggleModal()"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-timesheet-list">
      <timesheet-table />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TimesheetTable from '../components/TimesheetTable.vue';
import PageHeader from '../components/PageHeader.vue';

export default {
  name: 'Home',
  components: {
    TimesheetTable,
    PageHeader,
  },
  data() {
    return {
      headers: ['Name', 'Clients', 'Hours', 'Billable Hours', 'Billable Amount'],
      timesheet: {
        firstName: '',
        lastName: '',
        client: '',
        project: '',
        projectCode: '',
        hours: '',
        billable: false,
        billableRate: '',
        date: '',
      },
      modal: false,
    };
  },
  methods: {
    ...mapActions({ newTimesheet: 'newTimesheet' }),
    createTimesheet() {
      this.newTimesheet(this.timesheet).then(this.toggleModal(), this.clearData());
    },
    clearData() {
      this.timesheet = {
        firstName: '',
        lastName: '',
        client: '',
        project: '',
        projectCode: '',
        hours: '',
        billable: false,
        billableRate: '',
        date: '',
      };
    },
    toggleModal() {
      this.modal = !this.modal;
      this.clearData();
    },
  },
};
</script>
