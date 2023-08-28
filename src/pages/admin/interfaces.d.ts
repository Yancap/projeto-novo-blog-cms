export interface Category {
    id: string;
    category: string;
}

export interface IArticles {
    id: string;
    title: string;
    subtitle: string;
    text: string;
    category: string;
    author: string;
    created_at: string;
    state: string;
    
}
export interface IAuthors {
    id: string;
    name: string;
    email: string;
    avatar: string | null | undefined;
    allArticles: number;
}
export type IComments = {
    id: string;
    text: string;
    created_at: string;
    user_name: string;
}
  
export interface ArticleComments {
comments: Comments[],
article: {
    slug: string;
    title: string;
    category: string;
}
}