import axios from "@/axios"

export const updateCompanyInfo = async (data) =>{
    try {
        let res = await axios.put('/company', {
            ...data
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


export const getCompanyByName = async (companyName) =>{
    try {
        let res = await axios.get(`/company/${companyName}`)        
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

