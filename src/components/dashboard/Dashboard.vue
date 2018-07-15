<template>
    <div>
        <v-layout wrap>
            <v-flex xs12 md12 lg12>
                <navbar></navbar>
            </v-flex>
            <v-flex xs12 md12 lg12>
                <Footer></Footer>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Navbar from './Navbar'
    import Footer from './Footer'

    export default {
        name: "dashboard",
        components: {
            Navbar,
            Footer
        },
    }
</script>

<style scoped>

</style>