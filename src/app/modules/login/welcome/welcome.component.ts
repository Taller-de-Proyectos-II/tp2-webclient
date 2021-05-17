import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PsychologistDTO } from 'src/app/core/models/psychologistDTO.model';
import { ArticleDTO } from 'src/app/core/models/articleDTO.model';
import { NewsService } from 'src/app/core/services/news.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  names: String = 'compañer@';
  psychologist: PsychologistDTO = null;
  articles: ArticleDTO[] = [];

  constructor(
    private router: Router,
    private newsService: NewsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('psychologist')) {
      this.router.navigate(['/']).then();
    } else {
      this.psychologist = JSON.parse(localStorage.getItem('psychologist'));
      this.names = this.psychologist.names;
      this.loadArticles();
    }
  }

  loadArticles() {
    this.loadingService.changeStateShowLoading(true);
    this.newsService.listArticles().subscribe(
      (data: any) => {
        if (data.articles.results) {
          this.articles = data.articles.results;
          this.articles.forEach((element) => {
            element.body = element.body.substring(0, 300) + '...';
            console.log(element);
          });
        } else this.articles = [];
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }
}
