import axios from "@/axios"

export const getJobsNameOfCompany = async () =>{
    try {
        let res= await axios.get('/job/jobs-name')
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
        
    }
}

export const getCountJobByStatus = async () =>{
    try {
        let res= await axios.get('/job/status-count')
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
        
    }
}

export const getJobByStatus = async ({status}) =>{
    try {
        let res= await axios.get(`/job/status/${status}`)
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
        
    }
}


export const getUserFavorite = async () =>{
    try {
        let res= await axios.get('/job/user-favorite')
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
        
    }
}

export const getJobByNameAndCompanyId = async ({jobName_companyId})=>{
    try {
        let res = await axios.get(`/job/${jobName_companyId}`)
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}


export const getCountInField = async ({field})=>{
    try {
        let res = await axios.get(`/job/count-in-field/${field}`)
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}



export const getOtherJobOfCompany = async ({jobName_companyId})=>{
    try {
        let res = await axios.get(`/job/others/${jobName_companyId}`)
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}


export const getJobOfCompany = async ({companyName})=>{
    try {
        let res = await axios.get(`/job/by-company-name/${companyName}`)
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}



export const updateViewNumber = async ({jobName_companyId}) =>{
    try {
        let res = await axios.put(`/job/update-view/:jobName_companyId`)        
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}


export const updateJob = async ({jobName, info}) =>{
    try {
        let res = await axios.put('/job', {
            jobName, info
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


export const createJob = async (data) =>{
    try {
        let res = await axios.post('/job', {
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


export const updateStatus = async({jobName, status}) =>{
    try {
        let res = await axios.put('/job/update-status', {
           jobName, status
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