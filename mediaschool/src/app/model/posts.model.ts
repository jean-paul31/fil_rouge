import { User } from 'firebase';


export class Post{

    private date: Date;

    public text: string

    private author: string;

    private title: string;

    private img: string;

    constructor( public id: User){}

}
