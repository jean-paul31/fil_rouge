export class Post{

    private date: Date;

    constructor(public titre: string,
                public author: string,
                public text: string,
                public img: string){}
}