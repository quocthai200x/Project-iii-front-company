<template >
    <div>
        <q-card flat class="q-px-md ">

            <div class="text-bold text-capitalize q-mb-xs">Yêu cầu công việc<strong class="text-negative">*</strong>
            </div>


            <div>
                <div class="q-mb-md">
                    <form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
                        <q-editor  max-height="400px" color="negative"  ref="editor_ref" @paste="onPaste" v-model="jobStore.form.requirement" />
                    </form>
                </div>

            </div>

        </q-card>

    </div>
</template>
<script>
import { useJobStore } from '../../stores/jobStore';
import { useQuasar } from 'quasar'
import { ref } from "vue"
export default {
    data() {
        return {
            jobStore: useJobStore(),
           
            options: [],
            $q: useQuasar(),
            desc: "",
            editorRef: ref(null)
        }
    },

    created() {


    },
    methods: {
        onPaste(evt) {
            // Let inputs do their thing, so we don't break pasting of links.
            if (evt.target.nodeName === 'INPUT') return
            let text, onPasteStripFormattingIEPaste
            evt.preventDefault()
            if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
                text = evt.originalEvent.clipboardData.getData('text/plain')
                this.$refs.editor_ref.runCmd('insertText', text)
            }
            else if (evt.clipboardData && evt.clipboardData.getData) {
                text = evt.clipboardData.getData('text/plain')
                this.$refs.editor_ref.runCmd('insertText', text)
            }
            else if (window.clipboardData && window.clipboardData.getData) {
                if (!onPasteStripFormattingIEPaste) {
                    onPasteStripFormattingIEPaste = true
                    this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text)
                }
                onPasteStripFormattingIEPaste = false
            }
        },


    }

}
</script>
<style lang="scss">

</style>