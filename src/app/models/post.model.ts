export interface IPostAPI {
    [key: string]: IPost
}

export interface IPost {
    id: string;
    image: string;
    location: string;
    title: string;
}