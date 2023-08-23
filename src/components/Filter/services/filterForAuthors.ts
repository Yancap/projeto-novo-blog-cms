import { Article, Authors } from "@/pages/admin/index";
import { FilterState } from "../FilterContent";

type Types =  Article | Authors 



export function filterForAuthors(filter: FilterState | null, objects:  Authors[] ){
    let setsObjects = [] as Authors[]
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
                        return b.all_articles - a.all_articles
                    })
                }
            }
        })  
    }
    console.log(setsObjects);
    
    return setsObjects
}