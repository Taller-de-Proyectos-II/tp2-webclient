import { Component, OnInit } from '@angular/core';
import { SymptomDTO } from 'src/app/core/models/symptomDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ManifestationService } from 'src/app/core/services/manifestation.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  physicalSymptoms: SymptomDTO[] = [];
  emotionalSymptoms: SymptomDTO[] = [];
  conductualSymptoms:SymptomDTO[] = [];
  cognitiveSymptoms: SymptomDTO[] = [];

  constructor(
    private loadingService: LoadingService,
    private manifestationService: ManifestationService
  ) { }

  ngOnInit(): void {
    this.getManifestation();
  }

  getManifestation() {
    this.loadingService.changeStateShowLoading(true);
    this.manifestationService.listAll().subscribe(
      (data: any) => {
        if (data.manifestationsDTO) {
          this.physicalSymptoms = data.manifestationsDTO.physical.symptoms;
          this.emotionalSymptoms = data.manifestationsDTO.emotional.symptoms;
          this.conductualSymptoms = data.manifestationsDTO.conductual.symptoms;
          this.cognitiveSymptoms = data.manifestationsDTO.cognitive.symptoms;
          this.loadingService.changeStateShowLoading(false);
        }
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

}
