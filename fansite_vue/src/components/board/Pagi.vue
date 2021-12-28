<template>
    <div class="pagnation">
        <li class="page prv" v-if="prevPage == true" @click="prev">이전 </li>
    <div :key="i" v-for="(li, i) in total">
    <span @click="page($event)" class="page">
        {{ total }}
    </span>
    </div>
    <li class="page next" v-if="nextPage == true" @click="next"> 다음</li>
</div>
</template>

<script>
import board from "../../models/board.js"
export default {
    mixins: [board],
    data() {
        return {
            page: 1, // 페이지 번호
            limit: 5, // 한페이지에 게시물 수
            total: this.total, // 전체 페이지 게시물 수
            pageLinks: 5, // 페이지 수
            lastPage: Math.ceil(this.total / this.limit), // 마지막 페이지
            preveNo: 0, // 이전페이지 번호
            nextNo: 0, // 다음페이지 번호
        };
    },
    methods: {
        async pagination() {
            
        }
    }
}
</script>