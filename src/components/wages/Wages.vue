<template>
    <div>
      <el-table :data="tableData" empty-text="No data to display" :default-sort = "{prop: 'date', order: 'descending'}" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180">
        </el-table-column>
        <el-table-column prop="name" label="Name" width="180">
        </el-table-column>
        <el-table-column prop="wage" label="Wage" :formatter="formatter" sortable>
        </el-table-column>
        <el-table-column label="Operations">
          <template scope="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    <table class="el-table__body">
        <tr class="totals" style="width: 100%">
            <td width="180">&nbsp;</td>
            <td width="180">&nbsp;</td>
            <td width="180">&nbsp;</td>
            <td><div class="cell">{{wageAmountsAry | currency('£')}}</div></td>
            <td>&nbsp;</td>
        </tr>
    </table>
    <app-csv-download :data="tableData" :filename="csvTitle"></app-csv-download>
    
    </div>
  </template>

  <script>
    import * as firebase from 'firebase';
    import {mapActions} from 'vuex'
    import accounting from 'accounting'
    import {addDecimals} from '../../lib/decimal-operations'
    import csvDownload from '../csvdownloader/csvDownload.vue'
    
    import getWages from '../mixins'
    

    export default {
      data() {
        return {
          csvTitle: "wages"
        }
      },
      mixins: [getWages],
      
      components: {
            appCsvDownload: csvDownload
      },
      computed: {
          
          tableData(){
               if (this.$store.getters.wagesFilterActive) {
                    return this.$store.getters.wagesFiltered
                }

                else {
                  return this.$store.getters.wages
                }
                
            },
            wageAmountsAry(){
                let sum = 0;
                if (this.$store.getters.wagesFilterActive) {
                    
                    sum = this.$store.getters.filteredWageAmountsAry;
                }
                else {
                    sum = sum = this.$store.getters.wageAmountsAry;
                }
                return addDecimals(sum).toFixed(2);
            } 
      },
      methods:{
          ...mapActions([    
                'removeFilterWages'
            ]),
          //format the amounts row...
          formatter(row, column){
              var value = row.wage
              var c = '£'
              return accounting.formatMoney(value, c);
          },
          handleDelete(index, row){
            firebase.database().ref('users/'+ this.user.uid).child('/wages/').child(row.id).remove();
            this.removeFilterWages();
            this.getWages();
          },
          csvDownload(){
            downloadCSV({ filename: "wages.csv", data: this.tableData });
          }
      }
    }
  </script>
