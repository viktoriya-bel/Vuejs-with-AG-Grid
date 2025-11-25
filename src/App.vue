<template>
  <ag-grid-vue
    :rowData="rowData"
    :columnDefs="columnDefs"
    style="height: 500px"
    :defaultColDef="defaultColDef"
    :statusBar="statusBar"
  >
  </ag-grid-vue>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'

import { AllEnterpriseModule, ColDef, LicenseManager, ModuleRegistry } from 'ag-grid-enterprise'
import { Data } from './type'
ModuleRegistry.registerModules([AllEnterpriseModule])
LicenseManager.setLicenseKey('<your license key>')

const columnDefs: ColDef<Data>[] = [
  { headerName: '№ п/п', field: 'id' },
  { headerName: 'Категория', field: 'parent' },
  { headerName: 'Наименование', field: 'label' },
]

const rowData: Data[] = [
  { id: 1, parent: null, label: 'Айтем 1' },
  { id: '91064cee', parent: 1, label: 'Айтем 2' },
  { id: 3, parent: 1, label: 'Айтем 3' },

  { id: 4, parent: '91064cee', label: 'Айтем 4' },
  { id: 5, parent: '91064cee', label: 'Айтем 5' },
  { id: 6, parent: '91064cee', label: 'Айтем 6' },

  { id: 7, parent: 4, label: 'Айтем 7' },
  { id: 8, parent: 4, label: 'Айтем 8' },
]

const defaultColDef = {
  flex: 1,
}

const statusBar = {}
</script>

<style scoped></style>
