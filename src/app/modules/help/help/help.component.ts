import { Component, OnInit } from '@angular/core';
import { QuestionTypeDTO } from 'src/app/core/models/questionTypeDTO.model';
import { SymptomDTO } from 'src/app/core/models/symptomDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ManifestationService } from 'src/app/core/services/manifestation.service';
import { QuestionTypeService } from 'src/app/core/services/questionType.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  questionTypes: QuestionTypeDTO[] = [];
  
  constructor(
    private loadingService: LoadingService,
    private questionTypeService: QuestionTypeService
  ) { }

  ngOnInit(): void {
    this.getQuestionTypes();
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

}
