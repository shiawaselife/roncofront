<script setup>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import {
  mdiAccountMultiple
} from '@mdi/js'
</script>


<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="학생 목록" />
      <TableSampleClients />
    </SectionMain>
  </LayoutAuthenticated>
</template>

