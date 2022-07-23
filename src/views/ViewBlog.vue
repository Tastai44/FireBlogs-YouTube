<template>
    <div class="post-view" v-if="currentBlog" >
        <Loading v-show="loading" />
        <div class="container quillWrapper">
            <h2>{{ this.currentBlog[0].blogTitle }}</h2>

            <h4>Posted on: {{ new Date(this.currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long"}) }}</h4>
            <img :src="this.currentBlog[0].blogCoverPhoto" alt="" />
            <div class="post-HTML ql-editor" v-html="this.currentBlog[0].blogHTML"></div>
            
            <br><br>

            <div class="comments">
                <h1>Comments</h1>

                <div class="comment-box">
                    <div :class="{invisible: !error}" class="err-message">
                        <p><span>Error: {{ this.errorMsg }}</span></p>
                    </div>
                <textarea
                    cols="138" rows="2"
                    :editorOptions="editorSettings"
                    placeholder="Write your comments here..."
                    v-model="commentHTML"
                />
                <!-- <button @click="refresh">Refresh</button> -->
                
                <label for="comment-photo" class="uploadPhoto">Upload Photo</label>
                <input type="file" ref="commentPhoto" id="comment-photo" @change="filePick" accept=".png, .jpg, .jpeg" />
                <span>File Chosen: {{ this.$store.state.commentPhotoName }} </span>

                <button @click="uploadComment">Comment</button>
                <br><br>
                <hr><br>
                </div>
                <div v-for="(comment, index) in commentPosts" v-bind:key="index">
                    <div v-if="comment.postID === currentBlog[0].blogID">
                        <div class="comment-user">
                            <b class="username"> {{ comment.profileUsername }} </b> 
                            Posted on: {{ new Date(comment.commentDate ).toLocaleString("en-us", { dateStyle: "long"}) }}<br>
                            <div class="comment-text">
                                {{comment.commentHTML}}  <br>
                                <img :src="comment.commentPhoto" alt="" />
                            </div>
                            <div  class="icons">
                                <div  class="icon">
                                    <Edit class="edit" />
                                </div>
                                <div @click="deleteComment(comment.commentID)" class="icon">
                                    <Delete class="delete" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/storage';
import db from "../firebase/firebaseInit";
import Loading from '../components/Loading.vue';
import Edit from "../assets/Icons/edit-regular.svg";
import Delete from "../assets/Icons/trash-regular.svg";

export default {
    name: "ViewBlog",
    data() {
        return {
            currentBlog: null,
            blogComment: null,
            file: null,
            error: null,
            errorMsg: null,
            loading: null,
            editorSettings: {
                modules: {
                    imageResize: {},
                },
            },
        };
    },

    async mounted() {
        this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
            return post.blogID === this.$route.params.blogid;
        });
    },


    methods: {
        deleteComment(id) {
            
            this.$store.dispatch("deleteComment", id);
            // this.loading = true;
            // this.$router.go(0);
            // this.loading = false;
            // console.log(this.commentPosts[0]) 
        },
        filePick() {
            this.file = this.$refs.commentPhoto.files[0];
            const fileName = this.file.name;
            this.$store.commit("NamePhotoComment", fileName);
            this.$store.commit("createCommentURL", URL.createObjectURL(this.file));
        },

       uploadComment() {
            if (this.commentHTML.length !== 0) {
                // if(this.file) {
                    this.loading = true;
                    const storageRef = firebase.storage().ref();
                    const docRef = storageRef.child(`documents/CommentPhotos/${this.$store.state.commentPhotoName}`);
                    docRef.put(this.file).on(
                        "state_changed", 
                        (snapshot) => {
                            console.log(snapshot);
                        },
                        (err) => {
                            console.log(err);
                            this.loading = false;
                        }, async () => {
                            const downloadURL = await docRef.getDownloadURL();
                            const timestamp = Date.now();
                            const dataBase = db.collection("commentPosts").doc(); // Declar into table!
                            await dataBase.set({
                                commentID: dataBase.id,
                                commentHTML: this.commentHTML,
                                commentPhoto: downloadURL,
                                commentPhotoName:this.commentPhotoName,
                                profileId: this.profileId,
                                profileUsername: this.profileUsername,
                                date: timestamp,
                                postID: this.currentBlog[0].blogID,
                            });
                            await this.$store.dispatch("getComment");
                            this.loading = false;
                            this.$router.go(0);
                            // this.$router.push({ name: "ViewBlog", params: {postID: this.currentBlog[0].blogID} });
                        }
                    );
                    return;
                // }
                // this.error = true;
                // this.errorMsg = "Please ensure you uploaded a photo!";
                // setTimeout(() => {
                //     this.error = false;
                // }, 5000);
                // return;
            }
            this.error = true;
            this.errorMsg = "Please ensure comment has been filled!";
            setTimeout(() => {
                this.error = false;
            }, 5000);
            return;
        },
    },

    components: {
        Loading,
        Edit,
        Delete,
    },
    

    computed: {
        profileId () {
            return this.$store.state.profileId;
        },
        profileUsername () {
            return this.$store.state.profileUsername;
        },

        commentPhotoName() {
            return this.$store.state.commentPhotoName;
        },

        commentHTML: {
            get() {
                return this.$store.state.commentHTML;
            },
            set(payload) {
                this.$store.commit("newCommentPost", payload);
            },
        },
        commentPosts() {
            return this.$store.state.commentPosts;
        },
        blogPosts() {
            console.log(this.$store.state.blogPosts);
            return this.$store.state.blogPosts;
        },
    },
};
</script>

<style lang="scss">
    .post-view {
        min-height: 100%;

        .container {
            max-width: 1000px;
            padding: 60px 25px;
        }

        .ql-editor {
            padding: 0;
        }

        h2 {
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
        }

        img {
            width: 100%;
            margin-bottom: 32px;
        }
        h4 {
            font-weight: 400;
            font-size: 14px;
            margin-bottom: 24px;
        }
        label,
        button,
        .router-button {
            transition: 0.5s ease-in-out all;
            align-self: center;
            font-size: 14px;
            cursor: pointer;
            border-radius: 20px;
            padding: 12px 24px;
            color: #fff;
            background-color: #303030;
            text-decoration: none;

            &:hover {
                background-color: rgba(48, 48, 48, 0.7);
            }
        }
        .blog-info {
            position: relative;
            display: flex;
            margin-bottom: 32px;

            input:nth-child(1) {
                min-width: 300px;
            }

            input {
                transition: 0.5s ease-in-out all;
                padding: 10px 4px;
                border: none;
                border-bottom: 1px solid #303030;

                &:focus {
                    outline: none;
                    box-shadow: 0 1px 0 0 #303030;
                }
            }

            .upload-file {
                flex: 1;
                margin-left: 16px;
                position: relative;
                display: flex;

                input {
                    display: none;
                }

                .preview {
                    margin-left: 16px;
                    text-transform: initial;
                }

                span {
                    font-size: 12px;
                    margin-left: 16px;
                    align-self: center;
                }
            }
        }

    }

  .comments {
    input {
        display: none;
    }
    .uploadPhoto{
        margin-left:8px ;
        margin-right:10px ;
    }

    .invisible {
            opacity: 0 !important;
        }

        .err-message {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            color: #fff;
            margin-bottom: 10px;
            background-color: #303030;
            opacity: 1;
            transition: 0.5s ease all;

            p {
                font-size: 14px;
            }

            span {
                font-weight: 600;
            }
        }
    .comment-user {
    .username {
        font-size: 20px;
    }
    .comment-text {
        margin: 10px;

        img {
            width: 20%;
        }
    }
    .icons {
            display: flex;
            position: relative;
            z-index: 99;

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background-color: #fff;
                transition: 0.5s ease all;

                &:hover {
                background-color: #303030;

                    .edit,
                    .delete {
                        path {
                            fill: #fff;
                        }
                    }
                }

                &:nth-child(1) {
                    margin-right: 8px;
                }
                .edit,
                .delete {
                    pointer-events: none;
                    height: 15px;
                    width: auto;
                }
            }

            
        }
}    
  }  
</style>