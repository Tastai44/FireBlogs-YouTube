<template>
    <div class="contact">
    <div class="Con_box">
        <h1 >Contact Us</h1> <br>
        <div class="box_text">
            Thank you to everyone who has shown interest in and trust in our website. 
            Otherwise, if you have any questions, don't keep it on your mind and please contact us. 
            We will respond as soon as possible.
            <br><br>
            <b>Email:</b> <br> 
            <li>Nuttanicha_Pra@cmu.ac.th [Customer service and Developer]<br></li>
            <li>tastthai.654@gmail.com [Developer]</li>
            <li>thiti_gaewja@cmu.ac.th [Developer]</li> 
            <li>supakorn_ud@cmu.ac.th [Developer]</li> 
            <li>marcharissawat@gmail.com [Developer]</li> 


        </div> 
    </div>
    </div>
</template>

<script>
// import BlogCard from "../components/BlogCard"
export default {
    name: 'ContactUs',
    // components: {BlogCard},
    computed: {
        blogPosts() {
            return this.$store.state.blogPosts;
        },
        editPost: {
            get() {
                return this.$store.state.editPost
            },
            set(payload) {
                this.$store.commit("toggleEditPost", payload)
            },
        },
    },
    beforeDestroy() {
        this.$store.commit("toggleEditPost", false);
    }
};
</script>

<style lang="scss" scoped>
    .contact{
        margin-top: 50px;
        .Con_box{
            // display: flex;
            margin: auto;
            h1{
                text-align: center;
            }
            .box_text{
                margin: auto;
                width: 500px;
                text-align: justify;
            }
        }
    
    }
    
    
    
</style>