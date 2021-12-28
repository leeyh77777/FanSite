<template>
    <div class="board_list">
    <table>
        <tbody>
        <tr :key="i" v-for="(li, i) in list" @click="goView(li.idx)" class="board_content">
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