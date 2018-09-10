<template>
    <div class="datebox" :class="{warnText:setError}" v-show="setDateboxStatus">
        <span class="label">{{label}}</span>
        <input class="inputBox" :name="name" :value="myDate" :placeholder="placeholder" @click="popUp" readonly="readonly" unselectable="on" />
        <i v-if="!readonly" class="iconfont icon-youjiantou"></i>
    </div>
</template>

<script>
import util from "../modules/util";
import jsBridge from "../modules/jsBridge";
export default {
    props: {
        "label" : {},
        "name" : {},
        "value" : {},
        "date" : {},
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
    },
    computed: {
        setDateboxStatus : function(){
            if(!this.show){
                this.myDate = "";
            }
            return this.show;
        }
    },
    data: () => {
        return {
            myDate : {},
            setError : false,
            timeStamp : util.getRandom(8),
        }
    },
    methods: {
        popUp : function(){
            if(!this.readonly){
                var year = "";
                var month = "";
                var day = "";
                if(this.myDate){
                    year = this.myDate.split("-")[0];
                    month = this.myDate.split("-")[1];
                    day = this.myDate.split("-")[2];
                }
                if(jsBridge.g_deviceType() == "IOS" && typeof iOSshowDatePopup == "function"){
                    iOSshowDatePopup(year,month,day,'JSBridge.setDateValue_'+this.timeStamp+'("%s0","%s1","%s2","")');
                }else if(jsBridge.g_deviceType() == "Android" && typeof Android == "object" && typeof Android.showDatePopup == "function"){
                    Android.showDatePopup(year,month,day,'JSBridge.setDateValue_'+this.timeStamp+'("%s0","%s1","%s2","")');
                }
            }
        },
        setChoose : function(year,month,day){
            this.setError = false;
            this.myDate = year + "-" + month + "-" + day;
            if(this.callback){
                this.callback(year,month,day,this.myDate);
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
        this.myDate = this.date;
        JSBridge['setDateValue_'+this.timeStamp] = this.setChoose;
    }
}
</script>

<style lang="less" scoped>
.datebox{
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