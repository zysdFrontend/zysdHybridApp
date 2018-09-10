<template>
    <div class="btn" @click="triggerRootEvent">{{text}}</div>
</template>

<script>
import util from "../modules/util";
export default {
    props: {
        "text" : {},
        "click" : {}
    },
    computed: {
    },
    data: () => {
        return {

        }
    },
    methods: {
        triggerRootEvent : function(){
            this.click();
        }
    },
    mounted: function(){
        
    }
}
</script>

<style lang="less" scoped>
.btn{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    color: #fff;
    touch-action: none;
    &+.btn{
        &:before{
            content: "";
            position: absolute;
            top: 30%;
            bottom: 30%;
            left: -1px;
            width: 1px;
            background-color: #fff;
        }
    }
}
</style>