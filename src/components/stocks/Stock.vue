<template>
    <div  class="col-xs-12 col-sm-6">
        <div class="panel panel-success">
            <div class="panel-heading">
                <div class="panel-title">
                    <h3><span>{{stock.name}}</span>  - Price: {{stock.price | currency}}</h3>
                </div>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="pull-left">
                            <input 
                                type="number" 
                                class="form-control" 
                                placeholder="quantity" 
                                v-model="stockQty"
                                :class="{danger : insufficientFunds}"
                                >
                        </div>
                        <div class="pull-right">
                            <button 
                                class="btn btn-success" 
                                @click="buyNewStock"
                                :disabled="insufficientFunds || stockQty <= 0 || !Number.isInteger(stockQty)">
                                {{insufficientFunds ? 'Not enough funds' : 'Buy'}}
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    import {mapActions} from 'vuex';
    
    export default {
		data(){
			return {
                stockQty: 0,
			}
		},
        props: ['stock'],
        computed: {
            insufficientFunds(){
                return this.stockQty * this.stock.price > this.funds;
            },
            funds(){
                return this.$store.getters.availableFunds
            }
        },
		methods: {
            
            ...mapActions([
                'buyStock'
            ]),

            buyNewStock(){
                const order = {
                    id: this.stock.id,
                    qty: this.stockQty,
                    price: this.stock.price
                }
                
                this.buyStock(order);
                this.stockQty = 0;
                
            }
		}
	}
</script>

<style scoped>
    .panel-heading h3 {
        font-size:12px;
        margin:0;
        font-weight: 200
    }
    .panel-heading h3 span {
        text-transform: uppercase;
        font-weight: 600
    }
    .danger {
        border:1px solid red;
    }
</style>
