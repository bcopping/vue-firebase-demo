<template>
    <div>
      <el-table :data="tableData" empty-text="No data to display" :default-sort = "{prop: 'date', order: 'descending'}" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180">
        </el-table-column>
        <el-table-column prop="name" label="Name" width="180">
        </el-table-column>
        <el-table-column prop="dividend" label="Dividend" :formatter="formatter" sortable>
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
            <td><div class="cell">{{dividendAmountsAry | currency('£')}}</div></td>
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
    import getDividends from '../mixins'
    

    export default {
      data() {
        return {
          csvTitle: "dividends"
        }
      },
      mixins: [getDividends],
      
      components: {
            appCsvDownload: csvDownload
      },
      computed: {
          tableData(){
               if (this.$store.getters.dividendsFilterActive) {
                    return this.$store.getters.dividendsFiltered
                }

                else {
                  return this.$store.getters.dividends
                }
                
            },
            dividendAmountsAry(){
                let sum = 0;
                if (this.$store.getters.dividendsFilterActive) {
                    
                    sum = this.$store.getters.filteredDividendAmountsAry;
                }
                else {
                    sum = sum = this.$store.getters.dividendAmountsAry;
                }
                return addDecimals(sum).toFixed(2);
            } 
      },
      methods:{
          ...mapActions([    
                'removeFilterDividends'
            ]),
          //format the amounts row...
          formatter(row, column){
              var value = row.dividend
              var c = '£'
              return accounting.formatMoney(value, c);
          },
          handleDelete(index, row){
            firebase.database().ref('users/'+ this.user.uid).child('/dividends/').child(row.id).remove();
            this.removeFilterDividends();
            this.getDividends();
          },
          csvDownload(){
            downloadCSV({ filename: "dividends.csv", data: this.tableData });
          }
      }
    }
  </script>
