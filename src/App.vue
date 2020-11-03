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
      <canvas id="evolution-chart"></canvas>
    </div>
  </div>
</template>

<script>
  import { Line } from 'vue-chartjs'
  export default {
    extends: Line,
    data() {
      return {
        parameter: {},
        unitPrices: null,
        labels: null,
      }
    },
    methods: {
      createChart(chartId, chartData, chartLabels) {
        const ctx = document.getElementById(chartId);
        
        const data = {
          type: 'line',
          data: {
            labels: chartLabels,
            datasets: [
              { 
                label: 'CDB',
                backgroundColor: [
                  'rgba(71, 183,132,.5)', // Green
                ],
                borderColor: [
                  '#47b784',
                ],
                pointHoverRadius: 4,
                pointHitRadius: 10,
                pointHoverBorderWidth: 1,
                borderWidth: 1,
                data: chartData
              }
            ]
          },
          options: {
            responsive: true,
            lineTension: 5,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false,
                  padding: 5,
                }
              }]
            }
          }
        }

        const myChart = new Chart(ctx, {
          type: data.type,
          data: data.data,
          options: data.options,
        });
      },
      calculate() {
        this.axios
          .post('http://18.215.176.202:3000/calculator', this.parameter)
          .then(response => {
              this.unitPrices = response.data.map(entry => entry.unitPrice)
              this.labels = response.data.map(entry => entry.date.split('-').reverse().join('/'))
              this.createChart('evolution-chart', this.unitPrices, this.labels)
          })
          .catch(error => console.log(error))
          .finally(() => this.loaded = false)
      }
    }
  }
</script>