<template>
    <div class="buttonGroup">
        <slot></slot>
    </div>
</template>

<script>
import util from "../modules/util";
export default {
    props: {
        
    },
    computed: {
    },
    data: () => {
        return {

        }
    },
    methods: {
        
    },
    mounted: function(){
        
    }
}
</script>

<style lang="less" scoped>
.buttonGroup{
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    display: flex;
    flex-flow: row;
    align-items: stretch;
    height: 5rem;
    background-color: #cc5555;
    touch-action: none;
    transition: all 0.3s;
    z-index: 3;
}
</style>