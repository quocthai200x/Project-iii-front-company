<template >
    <div>
        {{  }}
    </div>
</template>
<script>
import Drawer from '../../../layouts/Drawer.vue';
import {getOne} from "../../../apis/application"
export default {
    created(){
        this.$emit("update:layout", Drawer)
        this.init()
    },
    data(){
        return{
            application: {

            }
        }
    },
    methods:{
        init(){
            let applicationId = this.$route.query.id;
            getOne({id: applicationId}).then(data=>{
                if(data){
                    this.application = data
                }else{
                    
                }
            })
        }
    }
}
</script>
<style lang="">
    
</style>