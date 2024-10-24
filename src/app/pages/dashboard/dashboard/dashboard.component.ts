import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { debounceTime, Subscription } from 'rxjs';
import { UtilsService } from '../../../core/services/utils.service';
import { LayoutService } from '../layout/app.layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  items!: MenuItem[];

  products: any[] = [
    {
      name: 'Corte de Cabello Clásico',
      price: 20.0,
    },
    {
      name: 'Arreglo de Barba',
      price: 15.0,
    },
    {
      name: 'Afeitado Completo',
      price: 25.0,
    },
    {
      name: 'Corte y Estilo',
      price: 30.0,
    },
    {
      name: 'Aplicación de Aceite para Barba',
      price: 10.0,
    },
    {
      name: 'Facial para Hombres',
      price: 40.0,
    },
    {
      name: 'Combo Corte y Barba',
      price: 45.0,
    },
  ];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;

  constructor(
    public layoutService: LayoutService,
    public utilsService: UtilsService
  ) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
        this.initChart();
      });
  }

  ngOnInit() {
    this.initChart();

    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' },
    ];
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Primer periodo',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: 0.4,
        },
        {
          label: 'Segundo periodo',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: 0.4,
        },
      ],
    };

    this.chartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
