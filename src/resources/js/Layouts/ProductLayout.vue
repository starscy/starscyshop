<script setup>
import Header from "./Components/Header.vue";
import Footer from "./Components/Footer.vue";

import { useAuth} from "../Composables/useAuth.js";

const { isAuthenticated, userName, logout } = useAuth()

const handleLogout = async () => {
    await logout()
}
</script>

<template>

    <div class="min-h-screen bg-gray-100">
        <Header/>

        <main>
            <slot/>
        </main>

        <Footer/>
    </div>
</template>
