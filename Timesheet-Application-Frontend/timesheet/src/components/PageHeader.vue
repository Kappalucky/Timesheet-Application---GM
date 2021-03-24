<template>
  <div class="relative py-3 mx-auto">
    <div class="flex lg:items-center justify-between">
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-medium text-gray-500 sm:text-sm sm:truncate text-left">Hours Tracked</h3>
        <template v-if="!totalHours">
          <h2 class="text-xl font-bold text-gray-900 sm:text-xl tracking-tight sm:truncate text-left">XXX.00</h2>
        </template>
        <template v-else>
          <h2 class="text-xl font-bold text-gray-900 sm:text-xl tracking-tight sm:truncate text-left">
            {{ totalHours }}
          </h2>
        </template>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-medium leading-7 text-gray-500 sm:text-sm sm:truncate text-right">Billable Amount</h3>
        <template v-if="!billableAmount">
          <h2 class="text-xl font-bold leading-7 text-gray-900 sm:text-xl tracking-tight sm:truncate text-right">
            $XX,XXX.00
          </h2>
        </template>
        <template v-else>
          <h2 class="text-xl font-bold leading-7 text-gray-900 sm:text-xl tracking-tight sm:truncate text-right">
            {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(billableAmount) }}
          </h2>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'PageHeader',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      billableAmount: (state) => state.billableAmount,
      totalHours: (state) => state.totalHours,
    }),
  },
  methods: {
    ...mapActions({ getTotalHours: 'getTotalHours', getTotalBillableAmount: 'getTotalBillableAmount' }),
  },
};
</script>

<style></style>
