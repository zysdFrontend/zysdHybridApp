<template>
    <div class="empSelect" :class="{warnText:setError}" v-show="setEmpSelectStatus">
        <span class="label">{{label}}</span>
        <input class="inputBox" :name="name" :value="myValue" :placeholder="placeholder" @click="popUp" readonly="readonly" unselectable="on" />
        <input v-show="hiddenDom" :name="hiddenName" :value="myHiddenValue" />
        <i class="iconfont icon-youjiantou" v-if="!readonly"></i>
    </div>
</template>

<script>
import util from "../modules/util";
import jsBridge from "../modules/jsBridge";
export default {
    props: {
        "label" : {},
        "name" : {},
        "hiddenName" : {},
        "value" : {},
        "hiddenValue" : {},
        "placeholder" : {},
        "callback" : {},
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
        "ids" : {},
        "names" : {},
        "empOrUser" : {
            type: [String],
            default: "user"
        },
        "multiple" : {
            type: [Boolean],
            default: false
        },
    },
    computed: {
        setEmpSelectStatus : function(){
            if(!this.show){
                this.myValue = "";
                this.myHiddenValue = "";
            }
            return this.show;
        }
    },
    data: () => {
        return {
            hiddenDom : false,
            myValue : {},
            myHiddenValue : {},
            setError : false,
            timeStamp : util.getRandom(8),
            emporuser : {},
        }
    },
    methods: {
        popUp : function(){
            if(!this.readonly){
                if(this.multiple){
                    if(jsBridge.g_deviceType() == "IOS" && typeof iOSpickMultipleColleague == "function"){
                        iOSpickMultipleColleague(this.emporuser,this.ids,this.names,'JSBridge.setEmpSelectValue_'+this.timeStamp+'("%s0","%s1","%s2","%s3","")');
                    }else if(jsBridge.g_deviceType() == "Android" && typeof Android == "object" && typeof Android.pickMultipleColleague == "function"){
                        Android.pickMultipleColleague(this.emporuser,this.ids,this.names,'JSBridge.setEmpSelectValue_'+this.timeStamp+'("%s0","%s1","%s2","%s3","")');
                    }
                }else{
                    if(jsBridge.g_deviceType() == "IOS" && typeof iOSpickSingleColleague == "function"){
                        iOSpickSingleColleague(this.emporuser,'JSBridge.setEmpSelectValue_'+this.timeStamp+'("%s0","%s1","")');
                    }else if(jsBridge.g_deviceType() == "Android" && typeof Android == "object" && typeof Android.pickSingleColleague == "function"){
                        Android.pickSingleColleague(this.emporuser,'JSBridge.setEmpSelectValue_'+this.timeStamp+'("%s0","%s1","")');
                    }
                }
            }
        },
        setChoose : function(id,name,deptId,deptName){
            this.setError = false;
            this.myValue = name;
            this.myHiddenValue = id;
            if(this.callback){
                this.callback(id,name,deptId,deptName);
            }
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
        if(this.empOrUser == "user"){
            this.emporuser = "0";
        }else if(this.empOrUser == "emp"){
            this.emporuser = "1";
        }
        this.myValue = this.value;
        this.myHiddenValue = this.hiddenValue;
        JSBridge['setEmpSelectValue_'+this.timeStamp] = this.setChoose;
    }
}
</script>

<style lang="less" scoped>
.empSelect{
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
        box-sizing: border-box;
        width: 100%;
        padding-right: 3.5%;
        font-size: 1.6rem;
        color: #666;
        text-align: right;
        background-color: transparent;
        border: none;
        border-radius: 0px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -webkit-tap-highlight-color: transparent;
    }
    .iconfont{
        display: flex;
        align-items: center;
        padding-right: 3.5%;
        font-size: 1.5rem;
        color: #bbb;
        white-space: nowrap;
    }
}
</style>