import { Component, OnInit } from '@angular/core';
import { Car } from 'app/model/car.model';
import { Registration } from 'app/model/registration.model';
import { CarService } from 'app/service/car/car.service';
import { RegistrationService } from 'app/service/registration/registration.service';
import { ParkingService } from 'app/util/parking.service';


declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  log: Registration[] = [];
  insides: Registration[] = [];
  cars: Car[] = [];
  dayProfit = 0;

  weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  today: Date = new Date();

  constructor(
    private service: RegistrationService,
    private carService: CarService,
    private parkingService: ParkingService
  ) { }

  ngOnInit(): void {
    this.getLog();
    this.getInsides();
    this.getCars();
  }

  getLog(): void {
    this.service.getAll().subscribe(
      success => {
        this.log = success;
        this.getDayProfit();
      }
    );
  }

  getInsides(): void {
    this.service.findAllInside().subscribe(
      success => {
        this.insides = success;
      }
    );
  }

  getCars(): void {
    this.carService.getAll().subscribe(
      success => {
        this.cars = success;
      }
    );
  }

  getDayProfit(): void {
    this.dayProfit = 0;
    this.today.setHours(0, 0, 0, 0);

    this.log.forEach(item => {
      const itemDay = new Date(item.checkout);
      itemDay.setHours(0, 0, 0, 0);

      if (itemDay >= this.today) {
        this.dayProfit += item.value;
      }
    });
  }

  getDayName(): string {
    return this.weekDays[this.today.getDay()];
  }

  getDayPrice(): number {
    return this.parkingService.generateValue();
  }

  // startAnimationForLineChart(chart: any) {
  //     let seq: any, delays: any, durations: any;
  //     seq = 0;
  //     delays = 80;
  //     durations = 500;
  //     chart.on('draw', function(data: any) {

  //       if (data.type === 'line' || data.type === 'area') {
  //         data.element.animate({
  //           d: {
  //             begin: 600,
  //             dur: 700,
  //             from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
  //             to: data.path.clone().stringify(),
  //             easing: Chartist.Svg.Easing.easeOutQuint
  //           }
  //         });
  //       } else if (data.type === 'point') {
  //             seq++;
  //             data.element.animate({
  //               opacity: {
  //                 begin: seq * delays,
  //                 dur: durations,
  //                 from: 0,
  //                 to: 1,
  //                 easing: 'ease'
  //               }
  //             });
  //         }
  //     });

  //     seq = 0;
  // }
  // startAnimationForBarChart(chart: any) {
  //     let seq2: any, delays2: any, durations2: any;
  //     seq2 = 0;
  //     delays2 = 80;
  //     durations2 = 500;
  //     chart.on('draw', function(data: any) {
  //       if (data.type === 'bar') {
  //           seq2++;
  //           data.element.animate({
  //             opacity: {
  //               begin: seq2 * delays2,
  //               dur: durations2,
  //               from: 0,
  //               to: 1,
  //               easing: 'ease'
  //             }
  //           });
  //       }
  //     });

  //     seq2 = 0;
  // }
  // // constructor(private navbarTitleService: NavbarTitleService) { }
  // public ngOnInit() {
  //     this.tableData = {
  //         headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
  //         dataRows: [
  //             ['US', 'USA', '2.920	', '53.23%'],
  //             ['DE', 'Germany', '1.300', '20.43%'],
  //             ['AU', 'Australia', '760', '10.35%'],
  //             ['GB', 'United Kingdom	', '690', '7.87%'],
  //             ['RO', 'Romania', '600', '5.94%'],
  //             ['BR', 'Brasil', '550', '4.34%']
  //         ]
  //      };
  //     /* ----------==========     Daily Sales Chart initialization    ==========---------- */

  //     const dataDailySalesChart = {
  //         labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  //         series: [
  //             [12, 17, 7, 17, 23, 18, 38]
  //         ]
  //     };

  //    const optionsDailySalesChart = {
  //         lineSmooth: Chartist.Interpolation.cardinal({
  //             tension: 0
  //         }),
  //         low: 0,
  //         high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
  //         chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  //     };

  //     const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

  //     this.startAnimationForLineChart(dailySalesChart);
  //     /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

  //     const dataCompletedTasksChart = {
  //         labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
  //         series: [
  //             [230, 750, 450, 300, 280, 240, 200, 190]
  //         ]
  //     };

  //     const optionsCompletedTasksChart = {
  //         lineSmooth: Chartist.Interpolation.cardinal({
  //             tension: 0
  //         }),
  //         low: 0,
  //         high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better
  //         // look
  //         chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
  //     };

  //    const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart,
  //     optionsCompletedTasksChart);

  //    this.startAnimationForLineChart(completedTasksChart);

  //     /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

  //     const dataWebsiteViewsChart = {
  //       labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  //       series: [
  //         [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

  //       ]
  //     };
  //     const optionsWebsiteViewsChart = {
  //         axisX: {
  //             showGrid: false
  //         },
  //         low: 0,
  //         high: 1000,
  //         chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
  //     };
  //     const responsiveOptions: any = [
  //       ['screen and (max-width: 640px)', {
  //         seriesBarDistance: 5,
  //         axisX: {
  //           labelInterpolationFnc: function (value) {
  //             return value[0];
  //           }
  //         }
  //       }]
  //     ];
  //     const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

  //     this.startAnimationForBarChart(websiteViewsChart);

  //     const mapData = {
  //          'AU': 760,
  //          'BR': 550,
  //          'CA': 120,
  //          'DE': 1300,
  //          'FR': 540,
  //          'GB': 690,
  //          'GE': 200,
  //          'IN': 200,
  //          'RO': 600,
  //          'RU': 300,
  //          'US': 2920,
  //      };
  //         $('#worldMap').vectorMap({
  //             map: 'world_mill_en',
  //             backgroundColor: 'transparent',
  //             zoomOnScroll: false,
  //             regionStyle: {
  //                 initial: {
  //                     fill: '#e4e4e4',
  //                     'fill-opacity': 0.9,
  //                     stroke: 'none',
  //                     'stroke-width': 0,
  //                     'stroke-opacity': 0
  //                 }
  //             },

  //             series: {
  //                 regions: [{
  //                     values: mapData,
  //                     scale: ['#AAAAAA', '#444444'],
  //                     normalizeFunction: 'polynomial'
  //                 }]
  //             },
  //         });
  //  }
  //  ngAfterViewInit() {
  //      const breakCards = true;
  //      if (breakCards === true) {
  //          // We break the cards headers if there is too much stress on them :-)
  //          $('[data-header-animation="true"]').each(function(){
  //              const $fix_button = $(this);
  //              const $card = $(this).parent('.card');
  //              $card.find('.fix-broken-card').click(function(){
  //                  const $header = $(this).parent().parent().siblings('.card-header, .card-image');
  //                  $header.removeClass('hinge').addClass('fadeInDown');

  //                  $card.attr('data-count', 0);

  //                  setTimeout(function(){
  //                      $header.removeClass('fadeInDown animate');
  //                  }, 480);
  //              });

  //              $card.mouseenter(function(){
  //                  const $this = $(this);
  //                  const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
  //                  $this.attr('data-count', hover_count);
  //                  if (hover_count >= 20) {
  //                      $(this).children('.card-header, .card-image').addClass('hinge animated');
  //                  }
  //              });
  //          });
  //      }
  //  }
}
