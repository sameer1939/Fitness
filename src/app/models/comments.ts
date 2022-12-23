export class Comments{
    id:number;
    name:string;
    message:string;
    email:string;
    parentId?:number;
    articleId:number;
    insertedDate:Date;
    childComments:Comments[]
}
