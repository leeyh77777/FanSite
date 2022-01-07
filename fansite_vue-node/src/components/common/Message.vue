<template>
<div class='message_popup' :class="{'dn': isHide }">
    <div class='tit'>알림</div>
    <div class='message'>{{ message }}</div>
    <div class='confirm'>
        <button type="button" @click="hidePopup">확인</button>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            isHide : true
        };
    },
    props : {
        message : {
            type : String,
        }
    },
    methods : {
        hidePopup() {
            this.isHide = true;
        }
    }
}
</script>

<style scoped>
.message_popup {
    box-sizing: border-box;
    position: fixed;
    width: 280px;
    border: 2px solid #621C31;
    border-radius: 10px;
    background-color: #ffffff;
    z-index: 100;
    left: calc(50% - 140px);
    top: calc(50% - 105px);
    padding: 20px;
}
.message_popup .tit {
    font-size: 1.5rem;
    font-weight: bold;
    padding-bottom: 10px; 
    border-bottom: 2px solid #621C31;
    margin-bottom: 15px;
}
.message_popup .confirm {
    text-align: center;
}
.message_popup button {
    background-color: #9b9b9b;
    border: 0;
    width: 100%;
    height: 40px;
    font-size: 15px;
    font-weight: bold;
    color: #DAE9E7;
    cursor: pointer;
    border-radius: 10px;
}
.message_popup button:hover {
    background-color: #B6ABAB;
    color: #906E5E;
}

.message_popup .message { 
    font-size: 0.8rem;
    height: 60px;
    padding: 10px 0;
    font-weight: bold;
}
</style>