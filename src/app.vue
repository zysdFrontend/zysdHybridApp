<template>
    <div class="appContainer">
        <validate-form :hasbutton="true" ref="checkForm">
            <div class="titleBlock">文本框</div>
            <text-input label="文本框(无单位)：" name="a" value="" placeholder="请输入值" :required="true"></text-input>
            <text-input label="文本框(有单位)：" name="b" value="" placeholder="请输入值" hasUnit="true" unit-text="万元" value="123"></text-input>
            <text-input label="数字框(有单位)：" value="" inputtype="number" placeholder="请输入值" hasUnit="true" unit-text="万元" value="123"></text-input>
            <text-input label="文本框(只读无单位)：" value="只读内容" :readonly="true"></text-input>
            <text-input label="文本框(只读千分位)：" value="333435" :readonly="true" thoundformat="true"></text-input>
            <text-input label="文本框(只读有单位)：" value="12" :readonly="true" has-unit="true" unit-text="月"></text-input>
            <text-input label="隐藏的文本框(无单位)：" value="" placeholder="请输入值" :required="true" :show="isShowCombobox"></text-input>
            <div class="titleBlock">选择框</div>
            <combobox label="本地数据选择框" data='[{"id":"Y","text":"是"},{"id":"N","text":"否"}]' placeholder="请选择" :required="true" :callback="showCombobox"></combobox>
            <combobox label="数据字典选择框" dictcode="SLRepaymentType" :host="host" :token="token" placeholder="请选择" :callback="chooseCallback"></combobox>
            <combobox label="远程数据选择框" url="materialsTypeController.do?getMaterTypeComboboxH5&inUse=1" :host="host" :token="token" placeholder="请选择" :callback="chooseCallback"></combobox>
            <combobox label="隐藏的选择框" name="dataComboboxName" hidden-name="dataComboboxCode" dictcode="SLRepaymentType" :host="host" :token="token" placeholder="请选择" :show="isShowCombobox" :callback="chooseCallback"></combobox>
            <datebox label="日期选择框" name="dataDatebox" :required="true" :callback="chooseDateCallback" placeholder="请选择"></datebox>
            <emp-select label="人员选择框(单选)" emp-or-user="user" :multiple="false" placeholder="请选择"></emp-select>
            <emp-select label="人员选择框(多选)" emp-or-user="user" :multiple="true" placeholder="请选择"></emp-select>
            <div class="titleBlock">文本域</div>
            <text-textarea label="可编辑文本域：" placeholder="请输入" :required="true"></text-textarea>
            <text-textarea label="只读文本域：" value="1" :readonly="true"></text-textarea>
            <text-textarea label="隐藏的文本域：" placeholder="请输入" :required="true" :show="isShowCombobox"></text-textarea>
        </validate-form>
        <button-group>
            <btn text="保存" :click="save"></btn>
            <btn text="提交" :click="submit"></btn>
        </button-group>
    </div>
</template>
<script>
import jsBridge from "./modules/jsBridge";
import textInput from './components/textInput.vue';
import textTextarea from './components/textTextarea.vue';
import validateForm from './components/validateForm.vue';
import combobox from './components/combobox.vue';
import datebox from './components/datebox.vue';
import empSelect from './components/empSelect.vue';
import buttonGroup from './components/buttonGroup.vue';
import btn from './components/btn.vue';
export default {
    props: {

    },
    components: {
        textInput,
        textTextarea,
        validateForm,
        combobox,
        datebox,
        empSelect,
        buttonGroup,
        btn
    },
    data: function(){
        return {
            token : {},
            host : {},
            isShowCombobox : false,
        }
    },
    methods: {
        save : function (){//保存
            let _this = this;
            this.$refs.checkForm.checkRequired();
            setTimeout(function(){
                debugger;
                let error = false;
                for(let i of _this.$refs.checkForm.$children){
                    if(i.setError){
                        error = true;
                        break;
                    }
                }
                if(!error){
                    console.log($(_this.$refs.checkForm.$el).serialize());
                }
            },0);
        },
        submit : function (){//提交
            let _this = this;
            this.$refs.checkForm.checkRequired();
            setTimeout(function(){
                let error = false;
                for(let i of _this.$refs.checkForm.$children){
                    if(i.setError){
                        error = true;
                        return
                    }
                }
                if(!error){
                    console.log($(_this.$refs.checkForm.$el).serialize());
                }
            },0);
        },
        chooseCallback : function(id,text){
            console.log("id: '"+id+"' , text: '"+text+"'");
        },
        chooseDateCallback : function(year,month,day,date){
            console.log(date);
        },
        showCombobox : function(id,text){
            if(id == "Y"){
                this.isShowCombobox = true;
            }else if(id == "N"){
                this.isShowCombobox = false;
            }
        },
    },
    created : function(){
        this.token = jsBridge.getToken();
        this.host = jsBridge.getHost();
    },
    mounted: function(){

    }
}
</script>

<style lang="less">
.appContainer{
    position: relative;
	width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    .titleBlock{
        height: 3.8rem;
        line-height: 3.8rem;
        background-color: #f7f7f7;
        font-size: 1.55rem;
        color: #666;
        text-align: center;
    }
}
</style>
