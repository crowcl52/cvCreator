export class PortfolioModel{
    img: string;
    name: string;
    url: string;

    constructor( obj: DataObj ){
        this.img = obj && obj.img || null
        this.name = obj && obj.name || null
        this.url = obj && obj.url || null
    }
}

interface DataObj{
    img: string;
    name: string;
    url: string;
}