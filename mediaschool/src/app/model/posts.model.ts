import { Comm } from "./com-model";


export class Post{

    // com: Comm;


    public author: string;

    public img: string;

    

    constructor( public texte: string,
                 public title: string,
                 public createdAt: string,
                 public postId: number,
                 public comment: Comm){}

}
