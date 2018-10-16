export class EducationModel{
    title: string;
    place: string;
    startDate: string;
    endDate: string;
    description: string;

    constructor( obj: DataObj ){
        this.title = obj && obj.title || null
        this.place = obj && obj.place || null
        this.startDate = obj && obj.startDate || null
        this.endDate = obj && obj.endDate || null
        this.description = obj && obj.description || null
    }
}

interface DataObj{
    title: string;
    place: string;
    startDate: string;
    endDate: string;
    description: string;
}