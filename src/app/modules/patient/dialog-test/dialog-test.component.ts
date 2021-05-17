import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionTypeDTO } from 'src/app/core/models/questionTypeDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { QuestionTypeService } from 'src/app/core/services/questionType.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.css'],
})
export class DialogTestComponent implements OnInit {
  questionTypes: QuestionTypeDTO[] = [];

  constructor(
    public matDialogRef: MatDialogRef<DialogTestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    private questionTypeService: QuestionTypeService,
    private testService: TestService
  ) {
    this.getQuestionTypes();
  }

  ngOnInit(): void {
   
  }

  getQuestionTypes() {
    this.loadingService.changeStateShowLoading(true);
    this.questionTypeService.listQuestionTypes().subscribe(
      (data: any) => {
        if (data.questionTypesDTO) {
          this.questionTypes = data.questionTypesDTO;
        } else this.questionTypes = [];
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  save(idQuestionType: number) {
    this.loadingService.changeStateShowLoading(true);
    this.testService.createTest(this.data, idQuestionType).subscribe(
      (data: any) => {
        if (data.status == 1) {
          this.matDialogRef.close(true);
        } else {
          this.snackBarService.info(data.message);
        }
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  cancel() {
    this.matDialogRef.close(false);
  }
}
