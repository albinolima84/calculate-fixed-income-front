<template>
    <div>
        <h3 class="text-center">Calcular Investimento</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="calculate">
                    <div class="form-group">
                        <label>Data Inicial</label>
                        <input type="date" required class="form-control" min="2010-01-04" max="2019-12-03" v-model="parameter.investmentDate">
                    </div>
                    <div class="form-group">
                        <label>Data Final</label>
                        <input type="date" required class="form-control" min="2010-01-04" max="2019-12-03" v-model="parameter.currentDate">
                    </div>
                    <div class="form-group">
                        <label>Percentual</label>
                        <input type="number" required class="form-control" min="0" step=".01" v-model="parameter.cdbRate">
                    </div>
                    <div class="form-group">
                        <label>Valor</label>
                        <input type="number" required class="form-control" min="0" step=".01" v-model="parameter.investmentValue">
                    </div>
                    <button type="submit" class="btn btn-primary">Calcular</button>
                </form>
            </div>
        </div>
        <div class="row">
          {{unitPrices}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              parameter: {},
              unitPrices: null  
            }
        },
        methods: {
            calculate() {

                this.axios
                    .post('http://localhost:3000/calculator', this.parameter)
                    .then(response => (
                        //this.$router.push({name: 'home'})
                        this.unitPrices = response.data
                    ))
                    .catch(error => console.log(error))
                    .finally(() => this.loading = false)
            }
        }
    }
</script>