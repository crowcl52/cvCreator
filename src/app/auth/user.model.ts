

export class User{
    
    public nombre: string;
    public email: string;
    public uid: string;


    constructor( user: DataObj ){
        this.nombre = user && user.nombre || null
        this.email = user && user.email || null;
        this.uid = user && user.uid || null;
    }
}

interface DataObj{
    nombre: string,
    email: string,
    uid: string
}