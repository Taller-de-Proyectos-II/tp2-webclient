export interface QuestionDTO {
    idQuestion: number,
    description: string,
    idQuestionType: number,
    score1?: number,
    score2?: number,
    score3?: number,
    score4?: number
}