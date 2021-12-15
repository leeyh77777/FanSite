<template>
    <div class="board_list">
    <table>
        <tbody>
        <tr :key="i" v-for="(li, i) in list" @click="goView(li.idx)">
            <td class="board_idx">
            {{ li.idx }}
            </td>
            <td class="board_subject">
            {{ li.subject }}
            </td>
            <td class="regDt">
            {{ li.regDt.substring(-19,10) }}
            </td>
        </tr>
        </tbody>
    </table>
    </div>
    <div class="pagnation">
        <span class="before" v-if="beforePage == true" @click="before">이전 </span>
        <div v-for="count in pageCnt" :key="count">
    <span
        @click="page($event)"
        class="page"
        :class="{ underline: Number(nowPage) % 5 == Number(count) % 5 || (nowPage == 1 && count == 1) }"
    >
        {{ (nowPages - 1) * 5 + count }}
    </span>
    </div>
    <span class="next" v-if="nextPage == true" @click="next"> 다음</span>
  </div>
  <MessagePopup :message="message" v-if="message" @click="out" />
</template>
<script>
import board from "../../models/board.js"
export default {
    mixins: [board],
    data() {
        return {
            title : "",
            list : [],
        };
    },
    async mounted() {
        this.list = await this.$get();
    },
    methods : {
        goView(idx) {
            this.$router.push({ path : "/board/view", query : { idx }});
        }
    }
}
</script>