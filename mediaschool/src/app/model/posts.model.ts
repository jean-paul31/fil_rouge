import { User } from 'firebase';

export class Post{

    private date: Date;

    private id: User;

    constructor(public title: string,
                public author: string,
                public text: string,
                public img: string){}
}
