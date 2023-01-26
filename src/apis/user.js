import axios from "@/axios"


export const doFollowJob = async ({jobName_companyId}) => {
    try {
        let res = await axios.post(`/user/${jobName_companyId}/like`)
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}
export const getAllEmailCompany = async () => {
    try {
        let res = await axios.get('/user/get-all-company-email')
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getCandidate = async ({userId}) => {
    try {
        let res = await axios.get(`/user/candidate/${userId}`)
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}


export const getAllEmployeeOfCompany = async () => {
    try {
        let res = await axios.get('/user/employee')
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}


export const updateUserInfo = async (data) => {
    try {
        let res = await axios.put('/user', {
            ...data
        })
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}



export const attachRole = async ({ targetEmail, roleName }) => {
    try {
        let res = await axios.post("/user/attach-role", {
            targetEmail, roleName
        })
        if (res.status == 200) {
            return res.data
        } else {
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}