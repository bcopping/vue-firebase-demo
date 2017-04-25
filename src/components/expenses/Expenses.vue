<template>
    <div>
      <el-table :data="tableData" empty-text="No data to display" :default-sort = "{prop: 'date', order: 'descending'}" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180">
        </el-table-column>
        <el-table-column prop="type" label="Type" width="180">
        </el-table-column>
        <el-table-column prop="name" label="Name" width="180">
        </el-table-column>
        <el-table-column prop="amountVAT" label="Amt (Inc VAT)" :formatter="formatter" sortable>
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
            <td><div class="cell">{{expenseAmountsVATAry | currency('£')}}</div></td>
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
    import getExpenses from '../mixins'
    

    export default {
      data() {
        return {
          csvTitle: "expenses"
        }
      },
      mixins: [getExpenses],
      
      components: {
            appCsvDownload: csvDownload
      },
      computed: {
          tableData(){
            if (this.$store.getters.expensesFilterActive) {
                    return this.$store.getters.expensesFiltered
                }

                else {
                  return this.$store.getters.expenses2
                }
            
          },
          expenseAmountsAry(){
            let sum = 0;
            if (this.$store.getters.expensesFilterActive) {
                
                sum = this.$store.getters.filteredExpenseAmountsAry;
            }
            else {
                sum = this.$store.getters.expenseAmountsAry;
            }
            return addDecimals(sum).toFixed(2);
          },
          expenseAmountsVATAry(){
            let sum = 0;
            if (this.$store.getters.expensesFilterActive) {
                
                sum = this.$store.getters.filteredExpenseAmountsVATAry;
            }
            else {
                sum = this.$store.getters.expenseAmountsVATAry;
            }
            return addDecimals(sum).toFixed(2);
          } 
      },
      methods:{
          ...mapActions([    
                'expensesOrdering',
                'deleteFilteredExpense',
                'removeFilterByType'
            ]),
          //format the amounts row...
          formatter(row, column){
              var value = row.amountVAT
              var c = '£'
              return accounting.formatMoney(value, c);
          },
          handleDelete(index, row){
            firebase.database().ref('users/'+ this.user.uid).child('/expenses2/').child(row.id).remove();
            this.deleteFilteredExpense(row.id)  
            this.getExpenses();
          },
          csvDownload(){
            downloadCSV({ filename: "test.csv", data: this.tableData });
          }
      }
    }
  </script>
