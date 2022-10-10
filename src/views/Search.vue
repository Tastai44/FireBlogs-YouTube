<template>
    <div class="S">
        <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Searching" v-model="search">
                    <!-- <div v-for="post in searchContent" :key="post.blogID"> -->
                            
                    <!-- </div> -->
                </div>
            </div>
            <div class="blog-card-wrap">
                <div class="blog-cards container">
                <BlogCard :post="post" v-for="(post, index) in searchContent" :key="index" />
                </div> 
            </div>
    </div>
</template>

<script>
import BlogCard from "../components/BlogCard"
export default {
    name: 'search',
    components: {BlogCard},
    data() {
        return {
            search: "",
        };
       },
   computed: {
       searchContent(){
            // this.show = false;
            return this.$store.state.blogPosts.filter((post) => post.blogTitle.toLowerCase().includes(this.search.toLowerCase()));
        },
   }
}
</script>

<style lang="scss" scoped>
.S{
    background: #f1f1f1;
    // margin: auto;
    align-items: center;
}
.inputs {
        width: 100%;
        max-width: 350px;
        // margin-left: 900px;
        margin: auto;
        margin-top: 20px;
        .input {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            // margin-bottom: 8px;
            input {
                width: 100%;
                border-radius: 20px;
                border: none;
                background-color: #fff;
                padding: 4px 4px 4px 30px;
                height: 50px;

                &:focus {
                    outline: none;
                }
            }

            .icon {
                width: 12px;
                position: absolute;
                left: 6px;
                color: #000;
                margin-right: 20px;
            }
        }
    }
</style>