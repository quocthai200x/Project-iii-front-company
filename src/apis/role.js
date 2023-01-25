import axios from "@/axios"

export const getAllRoleOfCompany = async () =>{
    try {
        let res = await axios.get('/role')        
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}
export const getAllOnlyRoleNameOfCompany = async () =>{
    try {
        let res = await axios.get('/role/only-name')        
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}


export const updateRole = async ({roleName, roleSetting,newName}) =>{
    try {
        let res = await axios.put('/role', {
            roleName, roleSetting,newName
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

export const createRole = async ({name,settings}) =>{
    try {
        let res = await axios.post('/role', {
           name,settings
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


