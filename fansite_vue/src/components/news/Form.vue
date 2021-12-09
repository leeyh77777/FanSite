<template>
    <form id='frmNews' ref="frmNews" autocomplete="off" @submit="formSubmit($event)">
        <input type="hidden" name="mode" :value="mode">
        <input type="hidden" name="idx" :value="news.idx" v-if="mode != 'add'">
        <dl>
            <dt>Types Of News</dt>
        <dd>
        <input type="radio" name="status" id='status_actor' value="actor" v-model="picked">
        <label for='status_actor'>Actor IU</label>

        <input type="radio" name="status" id='status_singer' value="singer" v-model="picked">
        <label for='status_singer'>Singer IU</label>

        <input type="radio" name="status" id='status_etc' value="etc" v-model="picked">
        <label for='status_etc'>etc</label>
        </dd>
        </dl>
        <dl>
            <dt>Subject</dt>
            <dd>
                <input type="text" name="subject" :value="news.subject">
            </dd>
        </dl>
        <dl>
            <dt>Content</dt>
            <dd>
                <div>
                    <div v-if="editor">
                    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                        bold
                    </button>
                    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                        italic
                    </button>
                    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                        strike
                    </button>
                    <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
                        code
                    </button>
                    <button @click="editor.chain().focus().unsetAllMarks().run()">
                        clear marks
                    </button>
                    <button @click="editor.chain().focus().clearNodes().run()">
                        clear nodes
                    </button>
                    <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                        paragraph
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                        h1
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                        h2
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                        h3
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                        h4
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                        h5
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                        h6
                    </button>
                    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                        bullet list
                    </button>
                    <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                        ordered list
                    </button>
                    <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
                        code block
                    </button>
                    <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
                        blockquote
                    </button>
                    <button @click="editor.chain().focus().setHorizontalRule().run()">
                        horizontal rule
                    </button>
                    <button @click="editor.chain().focus().setHardBreak().run()">
                        hard break
                    </button>
                    <button @click="editor.chain().focus().undo().run()">
                        undo
                    </button>
                    <button @click="editor.chain().focus().redo().run()">
                        redo
                    </button>
                    </div>
                     <editor-content :editor="editor" />
                    <input type="hidden" name="content" v-model="content" />
                     <input type="file" @change="addImage($event)">
                </div>
            </dd>  
        </dl>
        <input type="submit" value="뉴스 등록" v-if="mode == 'add'">
        <input type="submit" value="뉴스 수정" v-else>
    </form>
    <MessagePopup ref='popup' :message="message" />
</template>

<script>
import news from "../../models/news.js"
import MessagePopup from "../../components/common/Message.vue"
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
export default {
    mixins : [news],
    components : {MessagePopup, EditorContent},
    name: 'app',
    data() {
            return {
            message : "",
            editor : null,
           
        };
    },
    computed : {
        picked() {
            return this.news.status || "etc";
        },
        content() {
            return this.editor?this.editor.getHTML():null;
        }
    },
    mounted() {
         this.editor = new Editor({
                extensions: [
                    StarterKit,
                    Image,
                ],
                content : "",
        });
    },
    beforeUnmount() {
      this.editor.destroy()
    },
    props : {
        mode : {
            type : String,
            default : "add",
        },
        news : {
            type : Object,
            default() {
                return {
                    idx : 0,
                    status : "etc",
                    subject : "",
                    content : "",
                };
            }
        }
    },
    methods : {
        async formSubmit(e) {
            e.preventDefault();
            const formData = new FormData(this.$refs.frmNews);

            let result = {};
            let idx = 0;
            if (this.mode == 'add') { // 뉴스 추가
                result = await this.$addNews(formData);
                idx = result.data.idx;
            } else { // 뉴스 수정
                result = await this.$editNews(formData);
                idx = this.$route.query.idx;
            }
            
            if (result.success) {
                this.$router.push({ path : "/news/view", query : { idx }});
                return;
            }
           if (result.message) {
               this.$showMessage(this, result.message);
           }
            
        },
        addImage(e) {
            const target = e.target;
            const file = target.files[0];
            const reader = new FileReader();

            const editor = this.editor;
            reader.onload = function() {
            if (reader.result) {
                let html = editor.getHTML();
                html += `<img src='${reader.result}'>`;
                editor.commands.setContent(html);
                target.value = '';
            }
            }; 

            reader.onerror = function(err) {
                console.error(err);
            };

            reader.readAsDataURL(file);
        }
    }
}
</script>