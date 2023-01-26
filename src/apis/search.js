import axios from "@/axios"


export const suggestCandidate = async () =>{
    try {
        // console.log(text, filter, pageNumber)
        let res = await axios.get(`search/candidate-for-company`)        
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}


export const searchCompany = async ({keyword, pageNumber, limit}) =>{
    try {
        // console.log(text, filter, pageNumber)
        let res = await axios.post(`/search/company?pageNumber=${pageNumber}&limit=${limit}`, {
            keyword
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



export const searchJob = async ({text, filter, pageNumber, limit}) =>{
    try {
        // console.log(text, filter, pageNumber)
        let res = await axios.post(`/search/job?pageNumber=${pageNumber}&limit=${limit}`, {
            text, filter
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



export const searchCandidate = async ({text, filter, pageNumber,limit}) =>{
    try {
        let res = await axios.post(`/search/candidate?pageNumber=${pageNumber}&limit=${limit}`, {
            text, filter
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