import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionDTO } from 'src/app/core/models/questionDTO.model';
import { QuestionTypeDTO } from 'src/app/core/models/questionTypeDTO.model';
import { SymptomDTO } from 'src/app/core/models/symptomDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ManifestationService } from 'src/app/core/services/manifestation.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { QuestionTypeService } from 'src/app/core/services/questionType.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent implements OnInit {
  questionTypes: QuestionTypeDTO[] = [];
  questionsAnsiedad: QuestionDTO[] = [];
  questionsDepresion: QuestionDTO[] = [];
  displayedColumns = ['id', 'question', 'score1', 'score2', 'score3', 'score4'];

  constructor(
    private loadingService: LoadingService,
    private questionTypeService: QuestionTypeService,
    private psychologistService: PsychologistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    } else {
      this.getQuestionTypes();
    }
  }

  getQuestionTypes() {
    this.loadingService.changeStateShowLoading(true);
    this.questionTypeService.listQuestionTypes().subscribe(
      (data: any) => {
        if (data.questionTypesDTO) {
          this.questionTypes = data.questionTypesDTO;
          this.questionsAnsiedad = this.questionTypes[1].questionsDTO;
          this.questionsDepresion = this.questionTypes[0].questionsDTO;
          this.addDataAnsiedad();
          this.addDataDepresion();
        } else this.questionTypes = [];
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  addDataAnsiedad() {
    for (let i = 0; i < this.questionsAnsiedad.length; i++) {
      if (i == 4 || i == 8 || i == 12 || i == 16 || i == 18 || i == 19) {
        this.questionsAnsiedad[i].score1 = 4;
        this.questionsAnsiedad[i].score2 = 3;
        this.questionsAnsiedad[i].score3 = 2;
        this.questionsAnsiedad[i].score4 = 1;
      } else {
        this.questionsAnsiedad[i].score1 = 1;
        this.questionsAnsiedad[i].score2 = 2;
        this.questionsAnsiedad[i].score3 = 3;
        this.questionsAnsiedad[i].score4 = 4;
      }
    }
  }

  addDataDepresion() {
    for (let i = 0; i < this.questionsDepresion.length; i++) {
      if (
        i == 1 ||
        i == 4 ||
        i == 5 ||
        i == 10 ||
        i == 11 ||
        i == 13 ||
        i == 15 ||
        i == 16 ||
        i == 17 ||
        i == 19
      ) {
        this.questionsDepresion[i].score1 = 4;
        this.questionsDepresion[i].score2 = 3;
        this.questionsDepresion[i].score3 = 2;
        this.questionsDepresion[i].score4 = 1;
      } else {
        this.questionsDepresion[i].score1 = 1;
        this.questionsDepresion[i].score2 = 2;
        this.questionsDepresion[i].score3 = 3;
        this.questionsDepresion[i].score4 = 4;
      }
    }
  }
}
