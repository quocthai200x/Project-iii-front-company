<template >
    <div class="q-px-md">

        <div class="text-bold text-capitalize q-mb-sm">Phúc lợi từ công ty <strong class="text-negative">*</strong>
        </div>
        <div class="row q-gutter-xs">
            <div v-for="(benefit, index) in companyStore.info.benefits" :key="'benefits-' + index">
                <div class="rounded-borders visible-child q-pa-md relative-position"
                    :class="'bg-' + colorPallateForBenefits[index % colorPallateForBenefits.length]">
                    <div class="text-center  q-gutter-md 	">
                        <div>
                            <q-icon size="24px  " :name="benefit.svg">
                            </q-icon>

                        </div>
                        <div class="text-caption text-bold text-capitalize">
                            <span>{{ benefit.label }}</span>
                        </div>


                    </div>
                    <div class="  visible-if-hover">
                        <div class="q-my-xs">
                            <q-btn @click="editBenefit(index)" color="teal-4" unelevated icon="edit" size="xs"></q-btn>
                            <q-tooltip transition-show="scale" transition-hide="scale" self="center middle"
                                >Sửa</q-tooltip>
                        </div>
                        <div>
                            <q-btn  @click="deleteBenefit(index)" color="deep-orange-4" unelevated icon="delete" size="xs"></q-btn>
                            <q-tooltip transition-show="scale" transition-hide="scale" self="center middle"
                                >Xóa</q-tooltip>
                        </div>
                    </div>

                </div>
            </div>
            <div class=" ">
                <q-btn @click="addNewBenefit" padding="md" size="16px" color="deep-orange" outline>
                    <div class="col">
                        <q-icon size="" name="add" />
                        <div class="">Thêm</div>
                    </div>
                </q-btn>
            </div>
        </div>
    </div>
    <q-dialog v-model="isShowDialog">
        <q-card >
            <q-card-section>
                <div v-if="chooseIndex >= 0" class="text-subtitle2 text-bold text-capitalize">Sửa phúc lợi</div>
                <div v-else class="text-subtitle2 text-bold text-capitalize">Thêm phúc lợi</div>
            </q-card-section>

            <q-card-section class="q-pt-none   ">
                <div class="row justify-center">
                    <q-btn @click="chooseBenefits(indexIcon)" :color="indexIcon==chooseIconIndex?'deep-orange':'dark'" outline  class="col-2  text-center  q-ma-xs "
                     v-for="(icon, indexIcon) in iconsData" :key="'icon-'+indexIcon">
                        <div class="row  text-center">
                            <div class="fit">
                                <q-icon :name="icon.svg" size="xs"></q-icon>
                            </div>
                            <div class="fit text-caption">
                                {{icon.label}}
                            </div>
                        </div>
                        
                    </q-btn>
                </div>
            </q-card-section>
            <q-card-section>
                <div  class="text-subtitle2 text-bold text-capitalize">Mô tả</div>
                <q-input dense 
                :rules="[ val => val.length <= 10000 || 'Đã dùng tối đa 10000 kí tự']"
                counter
                lazy-rules
               
                placeholder="Tối đa 10000 kí tự..." :maxlength="10000" type="textarea" outlined color="deep-orange" v-model="benefitDialogData.desc">

                </q-input>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn @click="cancel" outline  flat label="Đóng" color="negative" v-close-popup />
                <q-btn @click="saveBenefit" outline  flat :label="chooseIndex<0?'Thêm':'Sửa'" color="negative" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>

</template>
<script>

import { jobDictionary } from '../../assets/dictionary/job';
import { useCompanyStore } from '../../stores/companyStore';
import { iconDictionary } from "../../assets/dictionary/icon"
export default {
    data() {
        return {
            benefitDialogData: {
                svg: "",
                desc: "",
                label: "",
            },
            iconsData: iconDictionary.list,
            chooseIconIndex: -1,
            chooseIndex: -1,
            isShowDialog: false,
            companyStore: useCompanyStore(),
            colorPallateForBenefits: [
                "pink-2",
                "deep-purple-2",
                "blue-2",
                "cyan-2",
                "lime-2",
                "amber-2",
                "deep-orange-2"
            ]
        }
    },
    methods: {
        addNewBenefit() {
            this.resetBenefitData();
            this.isShowDialog = true
        },
        chooseBenefits(indexIcon){
            this.chooseIconIndex=indexIcon;
            this.benefitDialogData.label=this.iconsData[indexIcon].label;
            this.benefitDialogData.svg=this.iconsData[indexIcon].svg;
        },
        cancel(){
            this.resetBenefitData(); 
            this.isShowDialog = false;   
        },
        saveBenefit(){
            let newData = {
                label: this.benefitDialogData.label,
                desc: this.benefitDialogData.desc,
                svg: this.benefitDialogData.svg
            }
            if(this.chooseIndex>=0){
                // tức edit
                this.companyStore.info.benefits[this.chooseIndex] = newData
            }else{
                // là new
                this.companyStore.info.benefits.push(newData)
            }
            this.resetBenefitData();
            this.isShowDialog = false;   
        },
        editBenefit(index){
            // bật lên thôi
            this.resetBenefitData();
            this.isShowDialog = true
            this.chooseIndex = index
            const isChoosenIcon = (element) => (
                element.svg == this.companyStore.info.benefits[index].svg 
                &&element.label==this.companyStore.info.benefits[index].label 
                )      
            
            this.chooseIconIndex = this.iconsData.findIndex(isChoosenIcon)
           
            let newData = {
                label: this.companyStore.info.benefits[index].label,
                desc: this.companyStore.info.benefits[index].desc,
                svg: this.companyStore.info.benefits[index].svg
            }
            this.benefitDialogData = newData;
        },
        deleteBenefit(index){
            // xóa khỏi store luôn
             this.companyStore.info.benefits.splice(index,1)
            
        },
        resetBenefitData(){

            this.benefitDialogData.desc = "";
            this.benefitDialogData.svg = "";
            this.benefitDialogData.label = "";
            this.chooseIconIndex = -1;
            this.chooseIndex = -1

        }
    }
}
</script>
<style lang="scss">
.stroke {
    border-style: solid;
    border-width: thin;
    aspect-ratio: 1;

}

.visible-if-hover {
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
}


.visible-child:hover .visible-if-hover {
    visibility: visible;

    background: rgba($color: #000000, $alpha: 0.5);
    transition: ease-in-out 200ms;
    opacity: 1;
}
</style>