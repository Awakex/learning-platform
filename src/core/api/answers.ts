import { Request } from "../request";
import { AnswerDto } from "../../dtos/AnswerDto";
import { CorrectAnswerDto } from "../../dtos/CorrectAnswerDto";

export const AnswersAPI = {
    getAnswersByQuestionId: (questionId: string) => {
        return Request.get(`/answers/${questionId}`);
    },
    createAnswer: (questionId: string, content: AnswerDto) => {
        return Request.post(`/answers/${questionId}/create`, content);
    },
    createCorrectAnswers: (questionId: string, answers: CorrectAnswerDto) => {
        return Request.post(`/answers/${questionId}/correct-answers`, answers);
    },
    checkCorrectAnswers: (questionId: string, answers: CorrectAnswerDto, setId?: string) => {
        if (!questionId) {
            return Promise.reject("Не указан ID");
        }

        return Request.post(
            `/answers/${questionId}/check-correct-answers${setId ? `?setId=${setId}` : ""}`,
            answers
        );
    },
};
