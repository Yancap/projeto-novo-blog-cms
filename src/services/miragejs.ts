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

export function makeServer(){
    const server = createServer({
        models: {
            article: Model.extend<Partial<Article>>({})
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
                    return i % 2 === 0 ? "active" : "inactive"
                },
                createdAt() {
                    const dataIni = new Date(2023, 0, 1);
                    const dataAtual = new Date();
                    return new Date(dataIni.getTime() + Math.random() * (dataAtual.getTime() - dataIni.getTime()));                },
                })
        },
        seeds(server){
            server.createList('article', 200)
        },
        routes() {
            this.namespace = 'api'
            this.timing = 750;

            this.get('/articles')
            this.post('/articles')

            this.namespace = ''
            this.passthrough()
        }
    })

    return server
}