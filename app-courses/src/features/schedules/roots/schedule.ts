import { Course } from "../entities/course";
import { Teacher } from "../entities/teacher";

type PropsEssential = {
    title: string;
    urlImage: string;
    duration: number;
    course: Course;
    teacher: Teacher;
}

type PropsOptional = {
    id: number;
    goals: string[];
    syllabus: string[];
    requirements: string[];
    frequency: string;
    rangeHours: string;
    start: Date;
    slogan: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

type ScheduleProps = PropsEssential & Partial<PropsOptional>;
type ScheduleUpdateProps = Partial<PropsEssential & Omit<PropsOptional, 'id' | 'createdAt' | 'updatedAt' | 'active'>>;

export class Schedule {
    private readonly id?: number;
    private title: string;
    private urlImage: string;
    private duration: number;
    private goals: string[];
    private syllabus: string[];
    private requirements: string[];
    private frequency: string
    private rangeHours: string;
    private start: Date | undefined;
    private slogan: string
    private active: boolean;
    private readonly createdAt: Date;
    private updatedAt: Date | undefined;
    private teacher: Teacher;
    private course: Course;

    constructor(props: ScheduleProps) {
        if (props.id) this.id = props.id;
        if (props.updatedAt) this.updatedAt = props.updatedAt;
        this.active = props.active ?? true;
        this.createdAt = props.createdAt ?? new Date();

        if (props.title.trim().length < 3 || props.title.trim().length > 255) {
            throw "Title must be between 3 and 255 characters long";
        }

        if (!/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\.(jpg|jpeg|png|gif)(\?[a-zA-Z0-9&=_-]*)?$/i.test(props.urlImage)) {
            throw "Image URL must be a valid image URL with jpg, jpeg, png, or gif extension";
        }

        if (props.duration <= 0) {
            throw "Duration must be a positive number";
        }

        if (props.goals && props.goals.length === 0) {
            throw "Goals cannot be an empty array";
        }

        if (props.syllabus && props.syllabus.length === 0) {
            throw "Syllabus cannot be an empty array";
        }

        if (props.requirements && props.requirements.length === 0) {
            throw "Requirements cannot be an empty array";
        }

        if (props.frequency && props.frequency.trim().length < 3) {
            throw "Frequency must be at least 3 characters long";
        }

        if (props.rangeHours && props.rangeHours.trim().length < 3) {
            throw "Range hours must be at least 3 characters long";
        }

        if (props.slogan && props.slogan.trim().length > 255) {
            throw "Slogan must be less than 255 characters long";
        }

        this.title = props.title;
        this.urlImage = props.urlImage;
        this.duration = props.duration;
        this.goals = props.goals ?? [];
        this.syllabus = props.syllabus ?? [];
        this.requirements = props.requirements ?? [];
        this.frequency = props.frequency ?? "";
        this.rangeHours = props.rangeHours ?? "";
        this.start = props.start;
        this.slogan = props.slogan ?? "";
        this.teacher = props.teacher;
        this.course = props.course;
    }

    delete() {
        this.active = false;
        this.updatedAt = new Date();
    }

    update(props: ScheduleUpdateProps) {
        if (props.title && (props.title.trim().length < 3 || props.title.trim().length > 255)) {
            throw "Title must be between 3 and 255 characters long";
        }

        if (props.urlImage && !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\.(jpg|jpeg|png|gif)(\?[a-zA-Z0-9&=_-]*)?$/i.test(props.urlImage)) {
            throw "Image URL must be a valid image URL with jpg, jpeg, png, or gif extension";
        }

        if (props.duration && props.duration <= 0) {
            throw "Duration must be a positive number";
        }

        if (props.goals && props.goals.length === 0) {
            throw "Goals cannot be an empty array";
        }

        if (props.syllabus && props.syllabus.length === 0) {
            throw "Syllabus cannot be an empty array";
        }

        if (props.requirements && props.requirements.length === 0) {
            throw "Requirements cannot be an empty array";
        }

        if (props.frequency && props.frequency.trim().length < 3) {
            throw "Frequency must be at least 3 characters long";
        }

        if (props.rangeHours && props.rangeHours.trim().length < 3) {
            throw "Range hours must be at least 3 characters long";
        }

        if (props.slogan && props.slogan.trim().length > 255) {
            throw "Slogan must be less than 255 characters long";
        }

        Object.assign(this, props);
        this.updatedAt = new Date();
    }

    get properties(): ScheduleProps {
        return {
            id: this.id,
            title: this.title,
            urlImage: this.urlImage,
            duration: this.duration,
            goals: this.goals,
            syllabus: this.syllabus,
            requirements: this.requirements,
            frequency: this.frequency,
            rangeHours: this.rangeHours,
            start: this.start,
            slogan: this.slogan,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            teacher: this.teacher,
            course: this.course,
        };
    }
}