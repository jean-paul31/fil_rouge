


export class Post{

    private author: string;

    private img: string;

    

    private id: string

    constructor( public text: string, public title: string, public lastUpdate: Date = new Date()){}

}
