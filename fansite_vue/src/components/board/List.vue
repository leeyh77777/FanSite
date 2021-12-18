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
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>
  <MessagePopup :message="message" v-if="message" @click="out" />
</template>
<script>
import board from "../../models/board.js"
export default {
    name: 'paginated-list',
    mixins: [board],
    data() {
        return {
            title : "",
            list : [],
            pageNum: 0
        }
    },
    props: {
        listArray: {
            type: Array,
            required: true
        },
        pageSize: {
            type: Number,
            required: false,
            default: 5
        }
    },
    async mounted() {
        this.list = await this.$get();
    },
    methods : {
        goView(idx) {
            this.$router.push({ path : "/board/view", query : { idx }});
        },
        nextPage() {
            this.pageNum += 1;
        },
        prevPage() {
            this.pageNum -= 1;
        }
    },
    computed: {
        pageCount () {
            let listLeng = this.listArray.length,
                listSize = this.pageSize,
                page = Math.floor(listLeng / listSize);
            if (listLeng % listSize > 0) page += 1;
            return page;
        },
        paginatedData () { 
            const start = this.pageNum * this.pageSize,
                    end = start + this.pageSize;
            return this.listArray.slice(start, end);
    }
    }
}
</script>