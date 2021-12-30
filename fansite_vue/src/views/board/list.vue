<template>
<img class="news_img" src="../../assets/board.png" style="max-width:100%; height:auto;">
<div class="b_tit">Community</div>
<button class="btn_board" type="button" @click="goLink('add')">글쓰기</button>
    <div class="board_list">
        <table>
            <thead>
                <tr>
                    <th class="boardNo">글번호</th>
                    <th class="boardSubject">제목</th>
                    <th class="boardPoster">작성자</th>
                    <th class="reg">등록일</th>
                </tr>
            </thead>
        </table>
    </div>
<List />
</template>
<script>
import List from "../../components/board/List.vue"
export default {
    components : {
        List
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