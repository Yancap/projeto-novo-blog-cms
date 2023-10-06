import { Article, IArticles } from '@/pages/admin/interfaces';
import { FilterState } from "../FilterContent";


export function filterForArticles(filter: FilterState | null, objects: IArticles[]  ){
    let setsObjects = [] as IArticles[] 
    if(objects && filter) {
        setsObjects = objects
        const keys = Object.keys(filter).map( key => key.split('_'))
        
        
        keys.forEach(key => {
            if(key[0] === "filter") {
                setsObjects = setsObjects.filter( object => {
                    if (key[1] === "category") {
                        return filter.filter_category && object.category === filter.filter_category
                    } 
                    if (key[1] === "author"){
                        return object.author === filter.filter_author
                    }
                    if (key[1] === "publication"){
                        const objectDate = new Date(object.created_at)
                        const objectYear = objectDate.getFullYear()
                        const objectMonth = objectDate.getMonth()
                        const objectDay = objectDate.getDate()
                        const now = new Date()
                        if (filter["filter_publication"] === "last-week") {
                            return now.getFullYear() - objectYear === 0 &&
                            now.getMonth() - objectMonth === 0 &&
                            now.getDate() - objectDay <= 7
                        } else if (filter["filter_publication"] === "last-month") {
                            return now.getFullYear() - objectYear === 0 &&
                            now.getMonth() - objectMonth === 0
                        } else if (filter["filter_publication"] === "last-year") {
                            return now.getFullYear() - objectYear === 0 
                        }
                    }
                })
            } 
            if (key[0] === 'order' && 'created_at' in objects[0]) {
                
                if(filter["order"] === "data") {
                    setsObjects = setsObjects.sort((a, b) =>  new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
                }
                if(filter["order"] === "title") {
                    setsObjects = setsObjects.sort((a, b) =>  {
                        let x = a.title.toLowerCase(),
                        y = b.title.toLowerCase()
                        return x == y ? 0 : x > y ? 1 : -1
                    })
                }
                if(filter["order"] === "authors") {
                    setsObjects = setsObjects.sort((a, b) =>  {
                        let x = a.author.toLowerCase(),
                        y = b.author.toLowerCase()
                        return x == y ? 0 : x > y ? 1 : -1
                    })
                }
            }
        })  
    }
    return setsObjects
}