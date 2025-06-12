interface Tag {
    id: string;
    name: string;
}

interface Author {
    id: string;
    name: string;
    profilePictureUrl?: string;
}

interface Question {
    id : string;
    title : string;
    tags : Tag[];
    author : Author;
    createdAt : Date;
    upvotes : number;
    answers : number;
    views : number;
}