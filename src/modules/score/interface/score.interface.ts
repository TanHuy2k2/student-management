import { StudentInterface } from "src/modules/student/interface/student.interface";
import { SubjectInterface } from "src/modules/subject/interface/subject.interface";

export interface ScoreInterface {
    "id": number,
    "attendance": number,
    "midterm": number,
    "final": number,
    "subject": SubjectInterface,
    "student": StudentInterface
}
