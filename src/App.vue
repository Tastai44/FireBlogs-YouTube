<template>
  <div class="app-wrapper">
    <div class="app" v-if="this.$store.state.postLoaded">
      <Navigation v-if="!navigation" />
      <router-view  />
      <Footer v-if="!navigation" />
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "app",
  components: { Navigation, Footer },
  data() {
    return {
      navigation: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if(user) {
        this.$store.dispatch("getCurrentUser", user);
        
      }
    });
    this.checkRoute();
    this.$store.dispatch("getPost");
    this.$store.dispatch("getComment");
  },
  mounted() {},
  methods: {
    checkRoute() {
      if(
        this.$route.name === "Login" || 
        this.$route.name === "Register" || 
        this.$route.name === "ForgotPassword"
        ) {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  watch: {
    $route() {
      this,this.checkRoute();
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

header {
        background-color: #fff;
        padding: 0 25px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        z-index: 99;

        .link {
            font-weight: 500;
            padding: 0 8px;
            transition: 0.3s color ease;
            
            &:hover {
                color: #1eb8b8;
            }
        }

        nav {
            display: flex;
            padding: 15px 0;

            .branding  {
                display: flex;
                align-items: center;
            
                .header {
                    font-weight: 600;
                    font-size: 24px;
                    color: #000;
                    text-decoration: none;
                }
            }
            .nav-links {
                position: relative;
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: flex-end;

                ul {
                    width: 400px;
                    margin-right: 32px;

                    .link {
                        margin-right: 32px;
                        color: #000;
                    }

                    .link:last-child {
                        margin-right: 0;
                    }
                }

                .profile {
                  position: relative;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  color: #fff;
                  background-color: #303030;

                  span {
                    pointer-events: none;
                  }

                  .profile-menu {
                    position: absolute;
                    top: 60px;
                    right: 0;
                    width: 250px;
                    background-color: #303030;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                    .info {
                      display: flex;
                      align-items: center;
                      padding: 15px;
                      border-bottom: 1px solid #fff;

                      .initials {
                        position: initial;
                        width: 40px;
                        height: 40px;
                        background-color: #fff;
                        color: #303030;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                      }

                      .right {
                        flex: 1;
                        margin-left: 24px;

                        p:nth-child(1) {
                          font-size: 14px;
                        }

                        p:nth-child(2),
                        p:nth-child(3) {
                          font-size: 12px;
                        }
                      }
                    } 

                    .options {
                      padding: 15px;
                      .option {
                        text-decoration: none;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;

                        .icon {
                          width: 18px;
                          height: auto;
                        }
                        p {
                          font-size: 14px;
                          margin-left: 12px;
                        }

                          &:last-child {
                          margin-bottom: 0px;
                        }
                      }
                    }
                  }
                }
            }
            
        }

        .menu-icon {
          cursor: pointer;
          position: absolute;
          top: 32px;
          right: 25px;
          height: 25px;
          width: auto;
        }

        .mobile-nav {
          padding: 20px;
          width: 70%;
          max-width: 250px;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100%;
          background-color: #303030;
          top: 0;
          left: 0;
        }

        .link {
          padding: 15px 0;
          color: #fff;  
        }
        
        .mobile-nav-enter-active,
        .mobile-nav-leave-active {
          transition: all 1s ease;
        }

        .mobile-nav-enter {
          transform: translateX(-250px);
        }

        .mobile-nav-enter-to {
          transform: translateX(0);
        }

        .mobile-nav-leave-to {
          transform: translateX(-250px);
        }
    }   




.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}
.arrow-light {
  path {
    fill: #fff;
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }

  .button-light {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
  }

  .button-inactive {
    pointer-events: none !important;
    cursor: none !important;
    background-color: rgba(128, 128, 128, 0.5) !important;
  }
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media(min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media(min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media(min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media(min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }

  }
}

</style>
