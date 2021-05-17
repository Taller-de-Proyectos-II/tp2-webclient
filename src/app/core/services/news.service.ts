import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  listArticles() {
    var apiKey = 'f250c617-30ee-44e5-9786-2029b9117bf3';
    return this.http.get(
      `https://newsapi.ai/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22conceptUri%22%3A%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FPsychology%22%7D%2C%7B%22locationUri%22%3A%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FPeru%22%7D%5D%7D%7D&dataType=news&resultType=articles&articlesSortBy=date&articlesCount=10&includeArticleBasicInfo=false&includeArticleEventUri=false&articleBodyLen=-1&apiKey=${apiKey}`
    );
  }
}
