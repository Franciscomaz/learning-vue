<template>
    <v-layout>
        <v-flex class="xs2 md2 lg1 sidebar">
            <v-navigation-drawer class="blue lighten-1" dark permanent :mini-variant.sync="mini">
                <v-list>
                    <v-list-tile v-for="item in items" :key="item.title" @click="goTo(item.path)">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </v-flex>
        <v-flex class="xs10 md10 lg11">
            <v-toolbar class="white--text blue darken-2">
                <v-toolbar-side-icon class="white--text" @click="changeSize"></v-toolbar-side-icon>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn class="white--text" flat>Link One</v-btn>
                    <v-btn class="white--text" flat>Link Two</v-btn>
                    <v-btn class="white--text" flat>Link Three</v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                items: [
                    {title: 'Dashboard', icon: 'dashboard', path: 'home'},
                    {title: 'Exit', icon: 'exit_to_app', path: 'login'},
                ],
                mini: false,
            }
        },
        methods: {
            goTo(name) {
                this.$router.push({name: name})
            },
            changeSize() {
                this.mini = !this.mini;
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        height: 93.2vh;
    }
</style>