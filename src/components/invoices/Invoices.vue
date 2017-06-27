<template>
    <div>
      
      <app-trading-year :yearFor="csvTitle"></app-trading-year>
    

      <el-table :data="tableData" empty-text="No data to display" :default-sort = "{prop: 'date', order: 'descending'}" style="width: 100%">
        <el-table-column width="40">
          <template scope="scope">
            <a her="#" @click="handleDelete(scope.$index, scope.row)">X</a>
          </template>
        </el-table-column>
        <el-table-column sortable prop="invNum" label="#" width="60">
        </el-table-column>
        <el-table-column sortable prop="date" label="Date" width="100">
        </el-table-column>
        <el-table-column prop="company" label="Company" width="120">
        </el-table-column>
        <el-table-column prop="invoiceDescription" label="Description">
        </el-table-column>
        <el-table-column align="right" prop="amountVAT" label="Amt (Inc VAT)" :formatter="formatter" sortable width="150">
        </el-table-column>
        
      </el-table>
      <br /><br />
      <div style="float:right;width:230px;">
        <h4>Total exc VAT <b style="float:right">{{invoiceAmountsAry | currency('£')}}</b></h4> 
        <h4>Total inc VAT <b style="float:right">{{invoiceAmountsVATAry | currency('£')}}</b></h4>
      </div>
      <br clear="all" />
      <app-csv-download :data="tableData" :filename="csvTitle"></app-csv-download>
    
    </div>
  </template>

  <script>
    import * as firebase from 'firebase/app';
    import {mapActions} from 'vuex'
    import accounting from 'accounting'
    import {addDecimals} from '../../lib/decimal-operations'
    import csvDownload from '../csvdownloader/csvDownload.vue'
    import selectTradingYear from '../tradingYear/selectTradingYear.vue'
    import getInvoices from '../mixins'
    

    export default {
      data() {
        return {
          csvTitle: "invoices",
          selected: this.$store.getters.totalYearsTrading
        }
      },
      mixins: [getInvoices],
    
      components: {
            appCsvDownload: csvDownload,
            appTradingYear: selectTradingYear
      },
      computed: {
          tableData(){
                console.log(this.$store.getters.invoicesTradingYearActive)
                
                if (this.$store.getters.invoicesFilterActive) {
                  
                  return this.$store.getters.invoicesFiltered
                }
                
                if (this.$store.getters.invoicesTradingYearActive) {
                  
                  return this.$store.getters.invoicesTradingYear
                }

                else {
                  
                  return this.$store.getters.invoices
                }
                
            },
            invoiceAmountsAry(){
                let sum = 0;
                if (this.$store.getters.invoicesFilterActive) {
                    
                    sum = this.$store.getters.filteredInvoiceAmountsAry;
                }
                else if (this.$store.getters.invoicesTradingYearActive) {
                    sum = this.$store.getters.tradingYearInvoiceAmountsAry;
                }
                else {
                    sum = sum = this.$store.getters.invoiceAmountsAry;
                }
                return addDecimals(sum).toFixed(2);
            },
            invoiceAmountsVATAry(){
                let sum = 0;
                if (this.$store.getters.invoicesFilterActive) {
                    sum = this.$store.getters.filteredInvoiceAmountsVATAry;
                }
                else if (this.$store.getters.invoicesTradingYearActive) {
                    sum = this.$store.getters.tradingYearInvoiceAmountsVATAry;
                }
                else {
                    sum = this.$store.getters.invoiceAmountsVATAry;
                }

                return addDecimals(sum).toFixed(2);
            },
            totalYearsTrading(){
               return this.$store.getters.totalYearsTrading
            },
            tradingYearsArry(){
               return this.$store.getters.tradingYearsArry
            }

      },
      methods:{
          ...mapActions([    
                'removeFilterInvoices',
                'filterInvoiceTradingYear',
        
            ]),
          //format the amounts row...
          formatter(row, column){
              var value = row.amountVAT
              var c = '£'
              return accounting.formatMoney(value, c);
          },
          handleDelete(index, row){
            firebase.database().ref('users/'+ this.user.uid).child('/invoices/').child(row.id).remove();
            this.removeFilterInvoices();
            this.getInvoices();
          },
          csvDownload(){
            downloadCSV({ filename: "dividends.csv", data: this.tableData });
          },
          
      },
      created() {
        this.filterInvoiceTradingYear(this.totalYearsTrading)
      }
    }
  </script>
