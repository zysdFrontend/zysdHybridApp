<template>
    <form class="validateForm" :class="{hasButton:hasbutton}">
        <slot></slot>
    </form>
</template>

<script>
import util from "../modules/util";
export default {
    props: {
        "submiturl" : {},
        "hasbutton" : {
            type: [String, Boolean],
            default: false
        },
    },
    computed: {
    },
    data: () => {
        return {

        }
    },
    methods: {
        checkRequired : function(){
            for(let i of this.$children){
                if(i.checkRequired){
                    i.checkRequired();
                }
            }
        }
    },
    mounted: function(){
    }
}
</script>

<style lang="less" scoped>
.validateForm{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    &.hasButton{
        bottom: 5rem;
    }
}
</style>