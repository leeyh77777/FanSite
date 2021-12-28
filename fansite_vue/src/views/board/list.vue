<template>
<img class="news_img" src="../../assets/board.png" style="max-width:100%; height:auto;">
<div class="b_tit">Community</div>
<button class="btn_board" type="button" @click="goLink('add')">글쓰기</button>
    <div class="board_list">
        <table>
            <thead>
                <tr>
                    <th class="boardNo">글번호</th>
                    <th>제목</th>
                    <th class="reg">등록일</th>
                </tr>
            </thead>
        </table>
    </div>
<List />
<Pagination />
</template>
<script>
import List from "../../components/board/List.vue"
import Pagination from "../../components/board/Pagi.vue"
export default {
    components : {
        List,
        Pagination
        },
    data() {
        return {
            checked: [],
        }
    },
    created() {
        if (!this.$isLogin() && this.$getToken()) {
            location.reload();
        }
    },
    methods : {
            goLink(link) {
                this.$router.push({ path : "/board/" + link, query : { idx : this.idx }});
            }
        }
}
</script>