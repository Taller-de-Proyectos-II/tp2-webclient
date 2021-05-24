import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { PsychologistDTO } from 'src/app/core/models/psychologistDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { DateService } from 'src/app/core/services/date.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogPatientComponent } from '../dialog-patient/dialog-patient.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  displayedColumns: string[] = [
    'hour',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  hours: HourDTO[] = [];
  hoursWithSessions: HourDTO[] = [];
  actualTab = 0;
  psychologist: PsychologistDTO = null;
  date = ['', '', '', '', '', '', ''];

  constructor(
    private scheduleService: ScheduleService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    private router: Router,
    private matDialog: MatDialog,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('psychologist')) {
      this.router.navigate(['/']).then();
    } else {
      this.psychologist = JSON.parse(localStorage.getItem('psychologist'));
      this.loadDates();
      this.createBasicSchedule();
    }
  }

  loadDates() {
    var date = new Date();
    const dateString = formatDate(
      date,
      'MM-dd-yyyy',
      'en-US'
    );
    this.dateService.listDates(dateString).subscribe((data:any) => {
      if(data.days) {
        this.date = data.days;
      }
    });
  }

  createBasicSchedule() {
    for (var i = 8; i < 21; i++) {
      var hour: HourDTO;
      hour = {
        hour: i,
        hourName: i + ':00 - ' + (i + 1) + ':00',
        monday: { id: 0, checked: false },
        tuesday: { id: 0, checked: false },
        wednesday: { id: 0, checked: false },
        thursday: { id: 0, checked: false },
        friday: { id: 0, checked: false },
        saturday: { id: 0, checked: false },
        sunday: { id: 0, checked: false },
      };
      this.hours.push(hour);
    }
    for (var i = 8; i < 21; i++) {
      var hour: HourDTO;
      hour = {
        hour: i,
        hourName: i + ':00 - ' + (i + 1) + ':00',
        monday: { id: 0, checked: false },
        tuesday: { id: 0, checked: false },
        wednesday: { id: 0, checked: false },
        thursday: { id: 0, checked: false },
        friday: { id: 0, checked: false },
        saturday: { id: 0, checked: false },
        sunday: { id: 0, checked: false },
      };
      this.hoursWithSessions.push(hour);
    }
    this.getBasicSchedule();
  }

  getBasicSchedule() {
    this.loadingService.changeStateShowLoading(true);
    this.scheduleService.list().subscribe(
      (data: any) => {
        data.schedulesDTO.forEach((element) => {
          var index = this.hours.findIndex((hour) => hour.hour == element.hour);
          switch (element.day) {
            case 1:
              this.hours[index].monday = {
                id: element.idSchedule,
                checked: false,
              };
              this.hoursWithSessions[index].monday = {
                id: element.idSchedule,
                checked: false,
              };
            case 2:
              this.hours[index].tuesday = {
                id: element.idSchedule,
                checked: false,
              };
              this.hoursWithSessions[index].tuesday = {
                id: element.idSchedule,
                checked: false,
              };
            case 3:
              this.hours[index].wednesday = {
                id: element.idSchedule,
                checked: false,
              };
              this.hoursWithSessions[index].wednesday = {
                id: element.idSchedule,
                checked: false,
              };
            case 4:
              this.hours[index].thursday = {
                id: element.idSchedule,
                checked: false,
              };
              this.hoursWithSessions[index].thursday = {
                id: element.idSchedule,
                checked: false,
              };
            case 5:
              this.hours[index].friday = {
                id: element.idSchedule,
                checked: false,
              };
              this.hoursWithSessions[index].friday = {
                id: element.idSchedule,
                checked: false,
              };
            case 6:
              this.hours[index].saturday = {
                id: element.idSchedule,
                checked: false,
              };
              this.hoursWithSessions[index].saturday = {
                id: element.idSchedule,
                checked: false,
              };
            case 7:
              this.hours[index].sunday = {
                id: element.idSchedule,
                checked: false,
              };
              this.hoursWithSessions[index].sunday = {
                id: element.idSchedule,
                checked: false,
              };
          }
        });
        this.loadingService.changeStateShowLoading(false);
        this.getPsychologistSchedule();
        this.getPsychologistScheduleWithSessions();
      },
      (error) => {
        this.loadingService.changeStateShowLoading(true);
        this.snackBarService.info('Error en el servidor');
      }
    );
  }

  getPsychologistSchedule() {
    var index;
    this.loadingService.changeStateShowLoading(true);
    this.scheduleService
      .listByPsychologistDni(this.psychologist.userLoginDTO.dni)
      .subscribe(
        (data: any) => {
          if (data.schedulesDTO) {
            data.schedulesDTO.forEach((element) => {
              index = this.hours.findIndex(
                (hour) => hour.monday.id == element.idSchedule
              );
              if (index != -1) {
                this.hours[index].monday = {
                  id: element.idSchedule,
                  checked: true,
                };
              }
              index = this.hours.findIndex(
                (hour) => hour.tuesday.id == element.idSchedule
              );
              if (index != -1) {
                this.hours[index].tuesday = {
                  id: element.idSchedule,
                  checked: true,
                };
              }
              index = this.hours.findIndex(
                (hour) => hour.wednesday.id == element.idSchedule
              );
              if (index != -1) {
                this.hours[index].wednesday = {
                  id: element.idSchedule,
                  checked: true,
                };
              }
              index = this.hours.findIndex(
                (hour) => hour.thursday.id == element.idSchedule
              );
              if (index != -1) {
                this.hours[index].thursday = {
                  id: element.idSchedule,
                  checked: true,
                };
              }
              index = this.hours.findIndex(
                (hour) => hour.friday.id == element.idSchedule
              );
              if (index != -1) {
                this.hours[index].friday = {
                  id: element.idSchedule,
                  checked: true,
                };
              }
              index = this.hours.findIndex(
                (hour) => hour.saturday.id == element.idSchedule
              );
              if (index != -1) {
                this.hours[index].saturday = {
                  id: element.idSchedule,
                  checked: true,
                };
              }
              index = this.hours.findIndex(
                (hour) => hour.sunday.id == element.idSchedule
              );
              if (index != -1) {
                this.hours[index].sunday = {
                  id: element.idSchedule,
                  checked: true,
                };
              }
            });
          }
          this.loadingService.changeStateShowLoading(false);
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
          this.snackBarService.info('Error en el servidor');
        }
      );
  }

  getPsychologistScheduleWithSessions() {
    var myDate = new Date();
    const dateString = formatDate(myDate, 'MM-dd-yyyy', 'en-US').toString();
    var index;
    this.loadingService.changeStateShowLoading(true);
    this.scheduleService
      .listSchedulesByPsychologistDniSessionsInSchedule(
        dateString,
        this.psychologist.userLoginDTO.dni
      )
      .subscribe(
        (data: any) => {
          if (data.schedulesDTO) {
            data.schedulesDTO.forEach((element) => {
              index = this.hoursWithSessions.findIndex(
                (hour) => hour.monday.id == element.idSchedule
              );
              if (index != -1) {
                this.hoursWithSessions[index].monday = {
                  id: element.idSchedule,
                  checked: true,
                  patientDni: element.patientDni,
                };
              }
              index = this.hoursWithSessions.findIndex(
                (hour) => hour.tuesday.id == element.idSchedule
              );
              if (index != -1) {
                this.hoursWithSessions[index].tuesday = {
                  id: element.idSchedule,
                  checked: true,
                  patientDni: element.patientDni,
                };
              }
              index = this.hoursWithSessions.findIndex(
                (hour) => hour.wednesday.id == element.idSchedule
              );
              if (index != -1) {
                this.hoursWithSessions[index].wednesday = {
                  id: element.idSchedule,
                  checked: true,
                  patientDni: element.patientDni,
                };
              }
              index = this.hoursWithSessions.findIndex(
                (hour) => hour.thursday.id == element.idSchedule
              );
              if (index != -1) {
                this.hoursWithSessions[index].thursday = {
                  id: element.idSchedule,
                  checked: true,
                  patientDni: element.patientDni,
                };
              }
              index = this.hoursWithSessions.findIndex(
                (hour) => hour.friday.id == element.idSchedule
              );
              if (index != -1) {
                this.hoursWithSessions[index].friday = {
                  id: element.idSchedule,
                  checked: true,
                  patientDni: element.patientDni,
                };
              }
              index = this.hoursWithSessions.findIndex(
                (hour) => hour.saturday.id == element.idSchedule
              );
              if (index != -1) {
                this.hoursWithSessions[index].saturday = {
                  id: element.idSchedule,
                  checked: true,
                  patientDni: element.patientDni,
                };
              }
              index = this.hoursWithSessions.findIndex(
                (hour) => hour.sunday.id == element.idSchedule
              );
              if (index != -1) {
                this.hoursWithSessions[index].sunday = {
                  id: element.idSchedule,
                  checked: true,
                  patientDni: element.patientDni,
                };
              }
            });
          }
          this.loadingService.changeStateShowLoading(false);
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
          this.snackBarService.info('Error en el servidor');
        }
      );
  }

  save() {
    var schedules: number[] = [];
    this.hours.forEach((element) => {
      if (element.monday.checked) schedules.push(element.monday.id);
      if (element.tuesday.checked) schedules.push(element.tuesday.id);
      if (element.wednesday.checked) schedules.push(element.wednesday.id);
      if (element.thursday.checked) schedules.push(element.thursday.id);
      if (element.friday.checked) schedules.push(element.friday.id);
      if (element.saturday.checked) schedules.push(element.saturday.id);
      if (element.sunday.checked) schedules.push(element.sunday.id);
    });
    var scheduleDTO = {
      psychologistDni: this.psychologist.userLoginDTO.dni,
      schedules: schedules,
    };
    this.loadingService.changeStateShowLoading(true);
    this.scheduleService.update(scheduleDTO).subscribe(
      (data: any) => {
        this.loadingService.changeStateShowLoading(false);
        this.snackBarService.info(data.message);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.actualTab = tabChangeEvent.index;
  }

  openDialogPatient(patientDni) {
    this.matDialog.open(DialogPatientComponent, {
      disableClose: true,
      data: patientDni,
    });
  }
}

export interface HourDTO {
  hour: number;
  hourName: string;
  monday: DayDTO;
  tuesday: DayDTO;
  wednesday: DayDTO;
  thursday: DayDTO;
  friday: DayDTO;
  saturday: DayDTO;
  sunday: DayDTO;
}

export interface DayDTO {
  id: number;
  checked: boolean;
  patientDni?: string;
}
