<template>
  <div class="home container mx-auto my-4 py-4">
    <div class="section-header">
      <page-header />
    </div>
    <div class="section-timesheet-list">
      <timesheet-table />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TimesheetTable from '../components/TimesheetTable.vue';
import PageHeader from '../components/PageHeader.vue';

export default {
  name: 'Home',
  components: {
    TimesheetTable,
    PageHeader,
  },
};
</script>
