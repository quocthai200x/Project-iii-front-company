import axios from "@/axios"

export const updateRole = async ({roleName, roleSetting}) =>{
    try {
        let res = await axios.put('/role', {
            roleName, roleSetting
        })        
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const createRole = async ({name}) =>{
    try {
        let res = await axios.post('/role', {
           name
        })        
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}


