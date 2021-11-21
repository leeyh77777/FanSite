<template>
<PageTitle>뉴스 내용</PageTitle>
<div class='news_view'>
    <dl>
        <dt>Types Of News</dt>
        <dd v-if="view.status == 'actor'">Actor IU</dd>
        <dd v-else-if="view.status == 'singer'">Singer IU</dd>
        <dd v-else>etc</dd>
    </dl>
    <dl>
        <dt>등록일</dt>
        <dd>{{ view.regDt }}</dd>
    </dl>
    <dl>
        <dt>작업명</dt>
        <dd>{{ view.subject }}</dd>
    </dl>
    
    <div v-html="view.contentHtml" class='content'></div>
    
    <div class='btns'>
        <button type="button" @click="goLink('add')">추가</button>
        <button type="button" @click="goLink('edit')">수정</button>
        <button type="button" @click="deleteNews">삭제</button>
        <button type="button" @click="goLink('list')">목록</button>
    </div>
</div>

<MessagePopup ref="popup" :message="message" />
</template>
<script>
import PageTitle from "../../components/PageTitle.vue"
import MessagePopup from "../../components/common/Message.vue"
import news from "../../models/news.js"
export default {
    components : {PageTitle, MessagePopup},
    mixins : [news],
    data() {
        return {
            message : "",
            view : {},
        };
    },
    async mounted() {
        const idx = this.$route.query.idx;
        const result = await this.$get(idx);
        if (result.success) {
            this.view = result.data;
        }
        if (result.message) {
            this.$showMessage(this, result.message);
        }
    },
    methods : {
        /** 링크 이동  */
        goLink(link) {
            this.$router.push({ path : "/news/" + link, query : { idx : this.view.idx }});
        },
        async deleteNews() {
            if (!confirm('정말 삭제하시겠습니까?')) {
                return;
            }
            const idx = this.view.idx;
            const result = await this.$deleteNews(idx);
            if (result.success) {
                this.$router.push({ path : "/news/list" });
            }
            if (result.message) {
                this.$showMessage(this, result.message);
            }
        }
    }
}
</script>