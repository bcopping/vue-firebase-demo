<template>
    <a @click="csvDownload">
        <span class="icon">
            <i class="fa fa-file-excel-o"></i>
        </span>
        <span>
            Download CSV
        </span>
    </a>
  </template>

  <script>

    import {downloadCSV} from '../../lib/csv-formatter'

    export default {
      data() {
        return {
        }
      },
      props: ['data', 'filename'],
      methods:{
          csvDownload(){
            //execute csv download
            downloadCSV({
                filename: this.filename + '.csv',
                data: this.data
            });
          }
      }
    }
  </script>
