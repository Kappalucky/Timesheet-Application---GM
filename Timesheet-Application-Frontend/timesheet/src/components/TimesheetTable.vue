<template>
  <div class="timesheet container mx-auto my-4 py-4">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-blue-500">Kartel Party</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-blue-500">Badman Entities</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-blue-500">34.02</div>
                  </td>
                  <!--If object is billable then billable hours is 100% else it is 0 -->
                  <td class="px-6 py-4 inline-flex whitespace-nowrap">
                    <div class="text-sm text-gray-900">34.02</div>
                    <p class="text-sm text-gray-400 ml-2 pr-2">(100%)</p>
                  </td>
                  <!--If object is billable then billable amount is returned else it is $0 -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">$538</div>
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
export default {
  name: 'TimesheetTable',
  data() {
    return {
      headers: ['Name', 'Clients', 'Hours', 'Billable Hours', 'Billable Amount'],
      timesheets: {
        firstName: 'Greg',
        lastName: 'Brown',
        client: 'Badman Entities',
        project: 'Kartel Party',
        projectCode: 'BM004',
        hours: '34.02',
        billable: 'true',
        billableRate: '80',
        date: '2020-04-21',
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
