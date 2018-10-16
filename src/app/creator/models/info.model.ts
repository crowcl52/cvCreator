export class WorkModel {
    name: string;
    title: string;
    email: string;
    country: string;
    city: string;
    age: number;
    phone: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    pinterest?: string;
    linkedin?: string;
    github?: string;
    bgColor: string;
    contColor: string;
    titleColor: string;
    txtColor: string;
    fooColor: string;
    socColor: string;
    iconColor: string;

    constructor(obj: DataObj) {
        this.name = obj && obj.name || null;
        this.title = obj && obj.title || null;
        this.email = obj && obj.email || null;
        this.country = obj && obj.country || null;
        this.city = obj && obj.city || null;
        this.age = obj && obj.age || null;
        this.phone = obj && obj.phone || null;
        this.facebook = obj && obj.facebook || null;
        this.twitter = obj && obj.twitter || null;
        this.instagram = obj && obj.instagram || null;
        this.pinterest = obj && obj.pinterest || null;
        this.linkedin = obj && obj.linkedin || null;
        this.github = obj && obj.github || null;
        this.bgColor = obj && obj.bgColor || null;
        this.contColor = obj && obj.contColor || null;
        this.titleColor = obj && obj.titleColor || null;
        this.txtColor = obj && obj.txtColor || null;
        this.fooColor = obj && obj.fooColor || null;
        this.socColor = obj && obj.socColor || null;
        this.iconColor = obj && obj.github || null;
    }
}

interface DataObj {
    name: string;
    title: string;
    email: string;
    country: string;
    city: string;
    age: number;
    phone: string;
    facebook: string;
    twitter: string;
    instagram: string;
    pinterest: string;
    linkedin: string;
    github: string;
    bgColor: string;
    contColor: string;
    titleColor: string;
    txtColor: string;
    fooColor: string;
    socColor: string;
    iconColor: string;

}