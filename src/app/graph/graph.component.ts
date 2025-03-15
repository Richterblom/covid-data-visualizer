import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-graph',
  standalone: false,
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css',
})
export class GraphComponent implements OnInit {
  // Array to store the data from the JSON file
  covidData: any[] = [];
  // Variable to store the chart object
  chart: any;
  // Index to track which dataset is shown
  currentDatasetIndex: number = 0;
  // Inject the HttpClient service
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Load the COVID data when the component is initialized
    this.loadCovidData();
  }

  loadCovidData(): void {
    // Load the JSON file with the COVID data
    this.http.get<any[]>('assets/covid.json').subscribe((data) => {
      this.covidData = data;
      // Create the chart after the data is loaded
      this.createChart();
    });
  }

  createChart(): void {
    // Extract the data from the JSON object
    const dates = this.covidData.map((entry) => entry.Date);
    const totalConfirmed = this.covidData.map(
      (entry) => entry['Total Confirmed Cases']
    );
    const totalDeaths = this.covidData.map((entry) => entry['Total Deaths']);
    const totalRecovered = this.covidData.map(
      (entry) => entry['Total Recovered']
    );
    const activeCases = this.covidData.map((entry) => entry['Active Cases']);

    const dailyConfirmed = this.covidData.map(
      (entry) => entry['Daily Confirmed Cases']
    );
    const dailyDeaths = this.covidData.map((entry) => entry['Daily deaths']);

    // Create the chart using Chart.js
    this.chart = new Chart('covidChart', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Total Confirmed Cases',
            data: totalConfirmed,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Total Deaths',
            data: totalDeaths,
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Total Recovered',
            data: totalRecovered,
            borderColor: 'green',
            fill: false,
          },
          {
            label: 'Active Cases',
            data: activeCases,
            borderColor: 'orange',
            fill: false,
          },
          {
            label: 'Daily Confirmed Cases',
            data: dailyConfirmed,
            borderColor: 'purple',
            borderDash: [5, 5],
            fill: false,
          },
          {
            label: 'Daily Deaths',
            data: dailyDeaths,
            borderColor: 'black',
            borderDash: [5, 5],
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        },
        elements: {
          line: {
            tension: 0.4, // Smooth out the lines
          },
        },
      },
    });
  }
  toggleDataset(): void {
    // Get the datasets from the chart
    const datasets = this.chart.data.datasets;
    // Get the total number of datasets
    const totalDatasets = datasets.length;

    // Hide the current dataset
    datasets[this.currentDatasetIndex].hidden = true;

    // Increment index and wrap around if necessary
    this.currentDatasetIndex = (this.currentDatasetIndex + 1) % totalDatasets;

    // Show the next dataset
    datasets[this.currentDatasetIndex].hidden = false;

    // Update the chart to reflect the changes
    this.chart.update();
  }
}
