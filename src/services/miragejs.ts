import { Factory, Model, createServer } from "miragejs"

type Article = {
    title: string;
    subtitle: string;
    text: string;
    category: string;
    author: string;
    created_at: string;
    state: string;
}

type Category = {
    id: string;
    category: string;
}

type Author = {
    id: string;
    name: string;
    email: string;
    all_articles: number;
}

type Comments = {
    id: string;
    text: string;
    created_at: string;
    user_name: string;
}

type ArticlesComments = {
    comments: Comments[],
    article: {
        slug: string;
        title: string;
        category: string;
    }
}

export function makeServer(){
    const server = createServer({
        models: {
            article: Model.extend<Partial<Article>>({}),
            category: Model.extend<Partial<Category>>({}),
            author: Model.extend<Partial<Author>>({}),
            comment: Model.extend<Partial<ArticlesComments>>({})
        },
        factories: {
            article: Factory.extend({
                title(i: number) {
                    return `Titulo do artigo sobre front end e suas tecnologias ${i + 1}`
                },
                subtitle(i: number) {
                    return `subtitulo sobre front-end ${i + 1}`
                },
                text() {
                    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Praesent accumsan, nisi tempor varius lacinia, 
                    ligula libero convallis nunc, quis suscipit leo 
                    turpis quis metus. Sed bibendum sed magna sed eleifend. 
                    Etiam fringilla mauris sit amet massa vehicula, 
                    at placerat magna efficitur. Phasellus ornare magna 
                    sed ante faucibus blandit. Donec cursus cursus elit, a 
                    vulputate mauris scelerisque elementum. Morbi a interdum quam. 
                    Maecenas nibh libero, semper fermentum accumsan at, pellentesque at mauris. 
                    Quisque egestas risus ut feugiat convallis.`
                },
                category() {
                    return "Front-end"
                },
                author() {
                    return "Yan Gabriel Ferreira"
                },
                state(i: number) {
                    return i % 3 === 0 ? "draft" : i % 2 === 0 ? "active" : "inactive"
                },
                created_at() {
                    const dataIni = new Date(2023, 0, 1);
                    const dataAtual = new Date();
                    const data = new Date(dataIni.getTime() + Math.random() * (dataAtual.getTime() - dataIni.getTime()))
                    return `${data.getDay() <= 10 ? "0"+data.getDay() : data.getDay()}/${data.getMonth() <= 10 ? "0"+data.getMonth() : data.getMonth()}/${data.getFullYear()}`;                
                },
            }),
            category: Factory.extend({
                id(i: number) {
                    return `category-${i + 1}`
                },
                category(i: number) {
                    const categories = ['front-end', 'back-end', 'mobile', 'ux & ui', 'inteligencia artificial', 'data science']
                    return categories[i]
                },
            }),
            author: Factory.extend({
                id(i: number) {
                    return `category-${i + 1}`
                },
                name(i: number) {
                    const names = ['Yan Gabriel', 'Marcus Vinycius', 
                    'Daiana Chargas', 'Dolly Santos', 'Pedro Car']
                    return names[i]
                },
                email(i: number) {
                    const names = ['yan@email.com', 'marcuschocador@email.com', 
                    'diana666@yaha.com', 'dollyguarana@gmail.com', 'pg@email.com']
                    return names[i]
                },
                all_articles(i: number) {
                    return i;
                }
            }),
            comment: Factory.extend({
                comments(i: number) {
                    const comments = []
                    for(let index = 0; index < (i*4); index++){
                        const dataIni = new Date(2023, 0, 1);
                        const dataAtual = new Date();
                        const data = new Date(dataIni.getTime() + Math.random() * 
                        (dataAtual.getTime() - dataIni.getTime()))
                        comments.push(
                            {
                                id: `comment-a${i}-${index}`,
                                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Nam imperdiet molestie finibus. Fusce mattis diam vel eros dapibus, 
                                in feugiat mauris euismod. Donec vulputate gravida dapibus. 
                                Integer tristique tellus nisl, vel molestie risus egestas vel. 
                                Nunc auctor aliquet sapien, vel hendrerit tortor pretium eget. 
                                In hac habitasse platea dictumst.`,
                                created_at: `${data.getDay() <= 10 ? "0"+data.getDay() : data.getDay()}/${data.getMonth() <= 10 ? "0"+data.getMonth() : data.getMonth()}/${data.getFullYear()}`,
                                user_name: 'Jonh Doe'
                            }
                        )
                    }
                    return comments 
                },
                article(i: number){
                    return {
                        slug: 'article-title-' + i,
                        title: `Titulo do artigo sobre front end e suas tecnologias ${i + 1}`,
                        category: "Front-end"
                    }
                }
            })
        },
        seeds(server){
            server.createList('article', 200)
            server.createList('category', 6)
            server.createList('author', 5)
            server.createList('comment', 4)
        },
        routes() {
            this.namespace = 'api'
            this.timing = 750;

            this.get('/articles')
            this.post('/articles')

            this.get('/categories', (schema) => {
                return schema.db._collections[1]._records
            })

            this.get('/authors', (schema) => {
                return schema.db._collections[2]._records
            })

            this.get('/comments', (schema) => {
                return schema.db._collections[3]._records
            })
            this.get('/comments/:slug', (schema, request) => {
                let slug = request.params.slug
                const [comments] = schema.db._collections[3]._records.filter((comment: ArticlesComments) => 
                    comment.article.slug === slug
                )
                
                return comments
            })
            this.namespace = ''
            this.passthrough()
        }
    })

    return server
}