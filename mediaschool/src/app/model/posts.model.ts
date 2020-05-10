import { User } from 'firebase';


export class Post{

    private date: Date;

    private id: User;

    private author: string;

    private title: string;

    private img: string;

    constructor( public text: string){}

}
