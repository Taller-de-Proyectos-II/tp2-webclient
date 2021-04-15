import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SessionService } from 'src/app/core/services/session.service';
import { SessionDTO } from 'src/app/core/models/sessionDTO.model';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogSessionComponent } from '../dialog-session/dialog-session.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
})
export class SessionComponent implements OnInit {
  sessionsWithoutLink: SessionDTO[] = [];
  sessionsWithLink: SessionDTO[] = [];
  sessionsFinished: SessionDTO[] = [];

  constructor(
    private sessionService: SessionService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    private matDialog: MatDialog,
    private psychologistService: PsychologistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    } else {
      this.loadSessionsFinished();
      this.loadSessionsWithLink();
      this.loadSessionsWithoutLink();
    }
  }

  loadSessionsWithoutLink() {
    this.loadingService.changeStateShowLoading(true);
    this.sessionService
      .listPending(this.psychologistService.getPsychologist().userLoginDTO.dni)
      .subscribe(
        (data: any) => {
          if (data.status == 1) {
            this.sessionsWithoutLink = data.sessionsDTO;
          } else {
            this.sessionsWithoutLink = [];
          }
          this.loadingService.changeStateShowLoading(false);
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
        }
      );
  }

  loadSessionsWithLink() {
    this.loadingService.changeStateShowLoading(true);
    this.sessionService
      .listAcepted(this.psychologistService.getPsychologist().userLoginDTO.dni)
      .subscribe(
        (data: any) => {
          if (data.status == 1) {
            this.sessionsWithLink = data.sessionsDTO;
          } else {
            this.sessionsWithLink = [];
          }
          this.loadingService.changeStateShowLoading(false);
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
        }
      );
  }

  loadSessionsFinished() {
    this.loadingService.changeStateShowLoading(true);
    this.sessionService
      .listFinished(this.psychologistService.getPsychologist().userLoginDTO.dni)
      .subscribe(
        (data: any) => {
          if (data.status == 1) {
            this.sessionsFinished = data.sessionsDTO;
          } else {
            this.sessionsFinished = [];
          }
          this.loadingService.changeStateShowLoading(false);
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
        }
      );
  }

  addLink(idSession) {
    this.matDialog
      .open(DialogSessionComponent, {
        data: idSession,
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.loadSessionsWithLink();
          this.loadSessionsWithoutLink();
        }
      });
  }

  updateFinished(session) {
    this.matDialog
      .open(DialogConfirmationComponent, {
        data: 'Se actualizará la sesión a "finalizada"',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.loadingService.changeStateShowLoading(true);
          this.sessionService
            .updateFinished({
              idSession: session.idSession,
              meetingLink: session.meetingLink,
            })
            .subscribe(
              (data: any) => {
                console.log(data);
                this.loadingService.changeStateShowLoading(false);
                if (data.status == 1) {
                  this.loadSessionsWithLink();
                  this.loadSessionsFinished();
                } else {
                  this.snackBarService.info(data.message);
                }
              },
              (error) => {
                this.loadingService.changeStateShowLoading(false);
              }
            );
        }
      });
  }
}
