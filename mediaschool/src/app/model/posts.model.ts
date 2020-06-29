import { Comm } from "./com-model";


export class Post{

    // com: Comm;


    public author: string;

    public img: string;

    // public comment= [{text:this.com.text, emmitedAt: this.com.emmitedAt}];

    public postId: number = 0

    constructor( public texte: string,
                 public title: string,
                 public createdAt: string,
                 ){}

}
