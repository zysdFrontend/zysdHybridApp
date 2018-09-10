<template>
    <div class="combobox" :class="{warnText:setError}" v-show="setComboboxStatus">
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
        "data" : {},
        "dictcode" : {},
        "url" : {},
        "placeholder" : {},
        "token" : {},
        "host" : {},
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
        setComboboxStatus : function(){
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
            myData : {},
            setError : false,
            timeStamp : util.getRandom(8),
        }
    },
    methods: {
        popUp : function(){
            if(!this.readonly){
                var _this = this;
                if(this.myData){
                    if(jsBridge.g_deviceType() == "IOS" && typeof iOSshowPopup == "function"){
                        iOSshowPopup(this.myData,'JSBridge.setPopupValue_'+this.timeStamp+'("%s0","%s1","")');
                    }else if(jsBridge.g_deviceType() == "Android" && typeof Android == "object" && typeof Android.showPopup == "function"){
                        Android.showPopup(this.myData,'JSBridge.setPopupValue_'+this.timeStamp+'("%s0","%s1","")');
                    }
                }else if(this.url){
                    $.ajax({
                        url : "http://192.168.13.220:8089/UCG_OSS/" + _this.url,
                        headers: {
                            token: _this.token
                        },
                        success : function(d){
                            d = JSON.parse(d);
                            _this.myData = "[";
                            for(let i = 0; i < d.obj.length; i++){
                                _this.myData = _this.myData + '{"id":"'+d.obj[i].id+'","text":"'+d.obj[i].text+'"},';
                            }
                            _this.myData = _this.myData.substring(0,_this.myData.length-1)+"]";
                            if(jsBridge.g_deviceType() == "IOS" && typeof iOSshowPopup == "function"){
                                iOSshowPopup(_this.myData,'JSBridge.setPopupValue_'+_this.timeStamp+'("%s0","%s1","")');
                            }else if(jsBridge.g_deviceType() == "Android" && typeof Android == "object" && typeof Android.showPopup == "function"){
                                Android.showPopup(_this.myData,'JSBridge.setPopupValue_'+_this.timeStamp+'("%s0","%s1","")');
                            }
                        }
                    });
                }else if(this.dictcode){
                    $.ajax({
                        url : "http://192.168.13.220:8089/UCG_OSS/" + "generalController.do?getDictByCode",
                        type : "post",
                        data : {dicCode:_this.dictcode},
                        headers: {
                            token: _this.token
                        },
                        success : function(d){
                            _this.myData = d;
                            if(jsBridge.g_deviceType() == "IOS" && typeof iOSshowPopup == "function"){
                                iOSshowPopup(d,'JSBridge.setPopupValue_'+_this.timeStamp+'("%s0","%s1","")');
                            }else if(jsBridge.g_deviceType() == "Android" && typeof Android == "object" && typeof Android.showPopup == "function"){
                                Android.showPopup(d,'JSBridge.setPopupValue_'+_this.timeStamp+'("%s0","%s1","")');
                            }
                        }
                    });
                }
            }
        },
        setChoose: function(id,text,name){
            this.myValue = text;
            this.myHiddenValue = id;
            this.setError = false;
            if(this.callback){
                this.callback(id,text);
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
        this.myValue = this.value;
        this.myHiddenValue = this.hiddenValue;
        this.myData = this.data;
        JSBridge['setPopupValue_'+this.timeStamp] = this.setChoose;
    }
}
</script>

<style lang="less" scoped>
.combobox{
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