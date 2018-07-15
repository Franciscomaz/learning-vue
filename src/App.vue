<template>
    <v-app>
        <notifications position="top right"></notifications>
        <div>
            <router-view>
            </router-view>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {}
        }
    }
</script>
