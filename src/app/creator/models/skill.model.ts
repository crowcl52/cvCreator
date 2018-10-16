export class SkillModel{
    name: string;
    percentage: number;
    color: string;
    type: string;

    constructor( obj: DataObj ){
        this.name = obj && obj.name || null
        this.percentage = obj && obj.percentage || null
        this.color = obj && obj.color || null
        this.type = obj && obj.type || null
    }
}

interface DataObj{
    name: string;
    percentage: number;
    color: string;
    type: string;
}