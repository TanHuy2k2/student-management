import { DayOfWeek } from "src/commons/enums/day.enum";
import { RoomInterface } from "src/modules/room/interface/room.interface";
import { StudentInterface } from "src/modules/student/interface/student.interface";
import { SubjectInterface } from "src/modules/subject/interface/subject.interface";
import { TeacherInterface } from "src/modules/teacher/interface/teacher.interface";

export interface ScheduleInterface {
    "id": number,
    "dayOfWeek": DayOfWeek,
    "startTime": string,
    "endTime": string,
    "subject": SubjectInterface,
    "teacher": TeacherInterface,
    "room": RoomInterface,
    "student": StudentInterface
}
