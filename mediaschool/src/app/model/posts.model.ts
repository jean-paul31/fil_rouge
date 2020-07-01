import { Comm } from './com-model';


export class Post {

    public author: string;

    public img: string;

    public postId: number;

    constructor( public title: string,
                 public createdAt: string,
                 public texte: string,
                 public comment: Comm) {}

}
