<template>
    <div class="textInput" :class="{hasUnit:hasUnit,warnText:setError}" v-show="setTextInputStatus">
        <span class="label">{{label}}</span>
        <input v-if="!readonly&&inputtype=='text'" class="inputBox" :name="name" type="text" :value="myValue" :placeholder="placeholder" @input="removeError($event)" />
        <input v-if="!readonly&&inputtype=='number'" class="inputBox" :name="name" type="number" :value="myValue" :placeholder="placeholder" @blur="toFixed" @input="onlyNum($event)" />
        <span v-if="!readonly && hasUnit" class="unit">{{unitText}}</span>
        <div v-if="readonly" class="textContainer">
            <span class="textBox">{{myValue}}</span>
            <span v-if="hasUnit" class="unit">{{unitText}}</span>
        </div>
    </div>
</template>

<script>
import util from "../modules/util";
export default {
    props: {
        "label" : {},
        "name" : {},
        "inputtype" : {
            default: "text"
        },
        "required" : {
            type: [Boolean],
            default: false
        },
        "hasUnit" : {
            type: [String, Boolean],
            default: false
        },
        "unitText" : {},
        "value" : {},
        "placeholder" : {},
        "readonly" : {
            type: [Boolean],
            default: false
        },
        "precision" : {
            type: [String, Number],
            default: 2
        },
        "thoundformat" : {
            type: [String, Boolean],
            default: false
        },
        "show" : {
            type: [Boolean],
            default: true
        },
    },
    computed: {
        setTextInputStatus : function(){
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
        toFixed : function(){
            this.myValue = Number(this.myValue).toFixed(this.precision);
        },
        onlyNum : function(e){
            this.setError = false;
            this.myValue = $(e.currentTarget).val();
            this.myValue = this.myValue.replace(/[^\d|.]/g, '').replace(/\.{2,}/g,".").replace(".","$#$").replace(/\./g,"").replace("$#$",".")
        },
        removeError : function(e){
            this.setError = false;
            this.myValue = $(e.currentTarget).val();
        },
        checkRequired : function(){
            if(!this.readonly && this.required && this.show){
                if($(this.$el).find("input").val() == ""){
                    this.setError = true;
                }
            }
        }
    },
    mounted: function(){
        this.myValue = this.value;
        if(this.readonly && this.thoundformat){
            this.myValue = String(Number(this.myValue).toFixed(this.precision));
            if(this.myValue.indexOf(".") != -1){
                this.myValue = this.myValue.split(".")[0].replace(/(?=(?!(\b))(\d{3})+$)/g, ",")+"."+this.myValue.split(".")[1];
            }else{
                this.myValue = this.myValue.replace(/(?=(?!(\b))(\d{3})+$)/g, ",");
            }
        }
    }
}
</script>

<style lang="less" scoped>
.textInput{
    display: flex;
    flex-flow: row;
    align-items: stretch;
    min-height: 5rem;
    padding-left: 3.5%;
    background-color: #fff;
    border-bottom: 1px solid #f7f7f7;
    &.warnText{
        background-color: #fff5f5;
    }
    .label{
        display: flex;
        line-height: 5rem;
        align-items: center;
        padding-right: 3.5%;
        font-size: 1.6rem;
        color: #333;
        white-space: nowrap;
    }
    .inputBox{
        display: block;
        width: 100%;
        padding-right: 3.5%;
        font-size: 1.6rem;
        color: #666;
        text-align: right;
        background-color: transparent;
        border: none;
        box-sizing: border-box;
        border-radius: 0px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -webkit-tap-highlight-color: transparent;
    }
    .textContainer{
        display: flex;
        width: 100%;
        justify-content: flex-end;
        .textBox{
            display: flex;
            width: auto;
            align-items: center;
            line-height: 2.5rem;
            padding: 2.8% 3.5%;
            font-size: 1.6rem;
            color: #666;
        }
    }
    &.hasUnit{
        .inputBox{
            padding-top: .3rem;
        }
        .unit{
            display: flex;
            align-items: center;
            padding-right: 3.5%;
            font-size: 1.6rem;
            color: #333;
            white-space: nowrap;
        }
        .textContainer{
            .textBox{
                padding-right: 0px;
            }
            .unit{
                display: flex;
                align-items: center;
                line-height: 2.5rem;
                padding-right: 3.5%;
                font-size: 1.6rem;
                color: #333;
                white-space: nowrap;
            }
        }
    }
}
</style>