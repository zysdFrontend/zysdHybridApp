<template>
    <div class="textTextarea" :class="{warnText:setError}" v-show="setTextareaStatus">
        <span class="label">{{label}}</span>
        <textarea v-if="!readonly" class="textareaBox" :placeholder="placeholder" :value="myValue" @input="removeError($event)"></textarea>
        <textarea v-if="readonly" class="textareaBox" readonly="readonly" disabled :value="myValue"></textarea>
    </div>
</template>

<script>
import util from "../modules/util";
export default {
    props: {
        "label" : {},
        "name" : {},
        "value" : {},
        "placeholder" : {},
        "readonly" : {
            type: [Boolean],
            default: false
        },
        "required" : {
            type: [Boolean],
            default: false
        },
        "show" : {
            type: [Boolean],
            default: true
        },
    },
    computed: {
        setTextareaStatus : function(){
            if(!this.show){
                this.myValue = "";
            }
            return this.show;
        }
    },
    data: () => {
        return {
            myValue : {},
            setError : false,
        }
    },
    methods: {
        removeError : function(e){
            this.setError = false;
            this.myValue = $(e.currentTarget).val();
        },
        checkRequired : function(){
            if(!this.readonly && this.required && this.show){
                if($(this.$el).find("textarea").val() == ""){
                    this.setError = true;
                }
            }
        }
    },
    mounted: function(){
        this.myValue = this.value;
    }
}
</script>

<style lang="less" scoped>
.textTextarea{
    background-color: #fff;
    border-bottom: 1px solid #f7f7f7;
    .label{
        display: block;
        height: 3.8rem;
        line-height: 5rem;
        padding: 0px 3.5%;
        font-size: 1.6rem;
        color: #333;
    }
    .textareaBox{
        display: block;
        width: 100%;
        min-height: 6.5rem;
        height: auto;
        line-height: 2.2rem;
        padding: .5rem 3.5% 1rem;
        box-sizing: border-box;
        font-size: 1.6rem;
        color: #666;
        white-space: pre-wrap;
        border: none;
        resize: none;
        &:disabled{
            color: #666;
            background-color: #fff;
            -webkit-text-fill-color: #666;
            -webkit-opacity: 1;
        }
    }
    &.warnText{
        .textareaBox{
            background-color: #fff5f5;
        }
    }
}
</style>