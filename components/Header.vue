<template>
    <div class = "header">
        <img class="header__logo" src="../static/susuLogoBig.png">
        <nav class="header__menu">
            <a class="header__link" v-for="link in headerLinks" :key="link.id" :href="link.url">{{link.description}}</a>
            <p class="header__loggedout">You're not logged in</p>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            headerLinks: [
                {
                    id: 1,
                    url: "FAQ",
                    description: "FAQ"
                },
                {
                    id: 2,
                    url: "http://edu.susu.ru",
                    description: "E-SUSU"
                }
            ]
        }
    }
}
</script>

<style scoped>
.header {
    background-color: #0A132D;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.header__logo {
    height: 75px;
    max-width: 50%;
    width: 600px;
}
.header__menu {
    width: 50%;
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 28px;
}
.header__link {
    text-decoration: none;
    color: white;
}
</style>