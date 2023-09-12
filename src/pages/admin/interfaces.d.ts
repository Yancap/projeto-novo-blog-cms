import { Article } from '@/pages/admin/index';
export interface Category {
    id: string;
    category: string;
}

export interface IArticles {
    slug: string;
    id: string;
    title: string;
    subtitle: string;
    text: string;
    image: string;
    category: string;
    author: string;
    created_at: string;
    state: string;
}

export interface Article{
    slug: string;
    id: string;
    title: string;
    subtitle: string;
    text: string;
    image: string;
    created_at: string;
    state: string;
    category: {
        category:string;
    },
    manager: {
        name:string;
    },
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