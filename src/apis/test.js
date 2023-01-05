import axios from "@/axios";

export const getAllSkills = async () =>{
    let letters="abcdefghijklmnopqrstuvwxyz"
    let data = []
    for (const letter of letters) {
        try {
            // console.log(text, filter, pageNumber)
            let res = await axios.get(`https://ms.vietnamworks.com/skill-tags/api/v1/skills/suggestion?query=${letter}`)        
            if(res.status == 200){
                res.data.forEach(item=>{
                    data.push(item.name)
                })
                if(letter == "z"){
                    return data
                }
            }else{
                throw new Error(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
}