export interface Tags {
  name: string;
}
  
export interface Credits{
name: string;
link: string;
}

export interface Category {
    id: string;
    category: string;
}

export interface FormCreateArticles{
    title: string;
    subtitle: string;
    image: string | ArrayBuffer | null;
    text: string;
    category: string;
    tags: Tags[];
    credits: Credits[];
  }
  