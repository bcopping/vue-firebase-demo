<template>
    <a href='#' @click="csvDownload">Download CSV</a>
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
              console.log(this.filename);
            downloadCSV({ 
                
                filename: this.filename + '.csv', 
                data: this.data 
            });
          }
      }
    }
  </script>
