import axios from "@/axios"

export const getApplicationByJobName = async ({jobName}) =>{
    try {
        let res = await axios.get(`/application/by-job-name?jobName=${jobName}`)
        if(res.status == 200){
            return res.data 
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}



export const invite = async ({jobName, candidateEmail})=>{
    try {
        let res = await axios.post('/application/invite', {
            jobName, candidateEmail
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

export const apply = async ({jobName, companyId}) =>{
    try {
        let res = await axios.post('/application/apply', {
            jobName, companyId
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

export const approveByUser = async ({applicationId}) =>{
    try {
        let res = await axios.put('/application/approve-by-user', {
            applicationId
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

export const rejectByUser = async ({applicationId}) =>{
    try {
        let res = await axios.put('/application/reject-by-user', {
            applicationId
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



export const approveByCompany = async ({applicationId}) =>{
    try {
        let res = await axios.put('/application/approve-by-company', {
            applicationId
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


export const rejectByCompany = async ({applicationId}) =>{
    try {
        let res = await axios.put('/application/reject-by-company', {
            applicationId
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

export const getAllApplicationIn_Company = async () =>{
    try {
        let res = await axios.get("/application/by-company")
        if(res.status == 200){
            return res.data 
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getAllApplicationIn_User = async () =>{
    try {
        let res = await axios.get("/application/by-user")
        if(res.status == 200){
            return res.data 
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getByUserWithJob = async ({jobId}) =>{
    try {
        let res = await axios.get(`/application/by-user-with-job?jobId=${jobId}`)
        if(res.status == 200){
            return res.data 
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}



export const changeStatusApplication = async( {id, type, interviewIndex }) =>{
    try {
        let res = await axios.put("/application/change-status",{
            id, type, interviewIndex
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


export const acceptOffer = async( {id }) =>{
    try {
        let res = await axios.put("/application/accept-to-work",{
            id
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


export const userComment = async( {comment, id }) =>{
    try {
        let res = await axios.post("/application/user-comment",{
            id, comment
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


export const companyComment = async( {comment, id }) =>{
    try {
        let res = await axios.post("/application/company-comment",{
            id, comment
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

export const closeApplication = async ({id}) =>{
    try {
        let res = await axios.put("/application/close-application",{
            id
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