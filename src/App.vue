<template>
  <ag-grid-vue
    :rowData="rowData"
    :columnDefs="columnDefs"
    style="height: 500px"
    :defaultColDef="defaultColDef"
    :statusBar="statusBar"
    groupDisplayType="groupRows"
  >
  </ag-grid-vue>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'

import { AllEnterpriseModule, ColDef, LicenseManager, ModuleRegistry } from 'ag-grid-enterprise'
import { Data, TableDisplay } from './type'
import { TreeStore } from './TreeStore'
ModuleRegistry.registerModules([AllEnterpriseModule])
LicenseManager.setLicenseKey('<your license key>')

const data: Data[] = [
  { id: 1, parent: null, label: 'Айтем 1' },
  { id: '91064cee', parent: 1, label: 'Айтем 2' },
  { id: 3, parent: 1, label: 'Айтем 3' },

  { id: 4, parent: '91064cee', label: 'Айтем 4' },
  { id: 5, parent: '91064cee', label: 'Айтем 5' },
  { id: 6, parent: '91064cee', label: 'Айтем 6' },

  { id: 7, parent: 4, label: 'Айтем 7' },
  { id: 8, parent: 4, label: 'Айтем 8' },
  { id: 9, parent: 1, label: 'Айтем 9' },
]

const treeStoreInstans = new TreeStore(data)
console.log(treeStoreInstans.getAll())
console.log(treeStoreInstans.getItem(5))
console.log(treeStoreInstans.getChildren(1))
console.log(treeStoreInstans.getAllChildren(1))
console.log(treeStoreInstans.getAllParents(8))
console.log(treeStoreInstans.getChildren(null))

const columnDefs: ColDef<TableDisplay>[] = [
  { headerName: '№ п/п', field: 'index', valueGetter: 'node.rowIndex + 1' },
  {
    headerName: 'Категория',
    field: 'category',
    // rowGroup: true,
  },
  { headerName: 'Наименование', field: 'label' },
]

const getRowData = (initId: string | number) => {
  const rowData = []
  const rootArray = treeStoreInstans.getChildren(initId)
  for (let index = 0; index < rootArray.length; index++) {
    if (treeStoreInstans.getChildren(rootArray[index].id).length) {
      const deepChildren = getRowData(rootArray[index].id)
      if (deepChildren.length) {
        rowData.push({ category: 'Группа', label: rootArray[index].label }, ...deepChildren)
      } else {
        rowData.push({ category: 'Группа', label: rootArray[index].label })
      }
    } else {
      rowData.push({ category: 'Элемент', label: rootArray[index].label })
    }
  }

  return rowData
}
const rowData = getRowData(null)
const defaultColDef = {
  flex: 1,
}

const statusBar = {}
</script>

<style scoped></style>
