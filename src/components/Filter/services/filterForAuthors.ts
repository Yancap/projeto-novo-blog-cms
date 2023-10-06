import { Article, IAuthors } from '@/pages/admin/interfaces';
import { FilterState } from "../FilterContent";


export function filterForAuthors(filter: FilterState | null, objects:  IAuthors[] ){
    let setsObjects = [] as IAuthors[]
    if(objects && filter) {
        setsObjects = objects
        const keys = Object.keys(filter).map( key => key.split('_'))
        
        keys.forEach(key => {
            
            if (key[0] === 'order') {
                if(filter["order"] === "authors") {
                    setsObjects = setsObjects.sort((a, b) =>  {
                        let x = a.name.toLowerCase(),
                        y = b.name.toLowerCase()
                        return x == y ? 0 : x > y ? 1 : -1
                    })
                }
                if(filter["order"] === "articles") {
                    setsObjects = setsObjects.sort((a, b) =>  {
                        return b.allArticles - a.allArticles
                    })
                }
            }
        })  
    }
    console.log(setsObjects);
    
    return setsObjects
}