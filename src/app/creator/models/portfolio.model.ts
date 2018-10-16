export class PortfolioModel{
    img: string;
    imgName: string;
    name: string;
    url: string;

    constructor( obj: DataObj ){
        this.img = obj && obj.img || null
        this.imgName = obj && obj.imgName || null
        this.name = obj && obj.name || null
        this.url = obj && obj.url || null
    }
}

interface DataObj{
    img: string;
    imgName: string;
    name: string;
    url: string;
}