<template>
    <div>
    <v-client-table :data="tableData" :columns="['invNum', 'date', 'company', 'invoiceDescription', 'amountVAT', 'erase']" :options="options">
        <template slot="amountVAT" scope="props">
            <div>
                {{props.row.amountVAT | currency('£')}}
            </div>
        </template>
        <template slot="erase" scope="props">
            <div>
                <a class="fa fa-trash-o" @click="erase(props.row.id)"></a>
            </div>
        </template>
    </v-client-table>

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

          options: {
            filterable: false
          }
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
          erase(t){
            firebase.database().ref('users/'+ this.user.uid).child('/invoices/').child(t).remove();
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
