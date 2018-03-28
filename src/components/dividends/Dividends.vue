<template>
    <div>
     <v-client-table :data="tableData" :columns="['date', 'name', 'dividend', 'erase']" :options="options">
        <template slot="dividend" scope="props">
            <div>
                {{props.row.dividend | currency('£')}}
            </div>
        </template>
        <template slot="erase" scope="props">
            <div>
                <a class="fa fa-trash-o" @click="erase(props.row.id)"></a>
            </div>
        </template>
    </v-client-table>

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
    import * as firebase from 'firebase/app';
    import {mapActions} from 'vuex'
    import accounting from 'accounting'
    import {addDecimals} from '../../lib/decimal-operations'
    import csvDownload from '../csvdownloader/csvDownload.vue'
    import getDividends from '../mixins'
    import selectTradingYear from '../tradingYear/selectTradingYear.vue'

    export default {
      data() {
        return {
            csvTitle: "dividends",
            options: {
                filterable: false
            }
        }
      },
      mixins: [getDividends],

      components: {
            appCsvDownload: csvDownload,
            appTradingYear: selectTradingYear
      },
      computed: {
          tableData(){
               if (this.$store.getters.dividendsFilterActive) {
                    return this.$store.getters.dividendsFiltered
                }
                if (this.$store.getters.dividendsTradingYearActive) {

                  return this.$store.getters.dividendsTradingYear
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
                else if (this.$store.getters.dividendsTradingYearActive) {
                    sum = this.$store.getters.tradingYearDividendAmountsAry;
                }
                else {
                    sum = this.$store.getters.dividendAmountsAry;
                }
                return addDecimals(sum).toFixed(2);
            },
            totalYearsTrading(){
               return this.$store.getters.totalYearsTrading
            },
      },
      methods:{
          ...mapActions([
                'removeFilterDividends',
                'filterDividendTradingYear'
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
          erase(t){
            firebase.database().ref('users/'+ this.user.uid).child('/dividends/').child(t).remove();
            this.removeFilterDividends();
            this.getDividends();
          },
          csvDownload(){
            downloadCSV({ filename: "dividends.csv", data: this.tableData });
          }
      },
      created(){
        this.filterDividendTradingYear(this.totalYearsTrading)
      }
    }
  </script>
  <style>

  </style>
