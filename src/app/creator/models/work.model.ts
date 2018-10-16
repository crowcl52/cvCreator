export class WorkModel{
    position: string;
    place: string;
    startDate: string;
    endDate: string;
    description: string;

    constructor( obj: DataObj ){
        this.position = obj && obj.position || null
        this.place = obj && obj.place || null
        this.startDate = obj && obj.startDate || null
        this.endDate = obj && obj.endDate || null
        this.description = obj && obj.description || null
    }
}

interface DataObj{
    position: string;
    place: string;
    startDate: string;
    endDate: string;
    description: string;

}