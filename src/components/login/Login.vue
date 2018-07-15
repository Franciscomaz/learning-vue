<template>
    <v-container class="elevation-2 mt-5" style="width: 20%; min-width: 400px">
        <v-layout>
            <v-flex class="pr-5 pl-5">
                <v-form ref="form" lazy-validation>
                    <h2 class="blue--text text--darken-2">Login</h2>
                    <div class="pt-2">
                        <v-text-field
                                v-model="username"
                                :error-messages="nameErrors"
                                :counter="10"
                                label="Username"
                                required
                                @input="$v.username.$touch()"
                                @blur="$v.username.$touch()"
                        ></v-text-field>
                    </div>
                    <div class="pt-2">
                        <v-text-field
                                v-model="password"
                                :error-messages="passwordErrors"
                                :type="'password'"
                                label="Password"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                        ></v-text-field>
                    </div>
                    <v-layout class="row justify-center">
                        <div>
                            <v-btn @click="submit" class="blue darken-2" style="color: white">
                                Login
                            </v-btn>
                        </div>
                        <div>
                            <router-link to="register">
                                <v-btn class="blue darken-2" style="color: white">
                                    Register
                                </v-btn>
                            </router-link>
                        </div>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, minLength, maxLength} from 'vuelidate/lib/validators'
    import Config from '../../config/config'

    export default {
        name: "Login",
        mixins: [validationMixin],
        data() {
            return {
                username: '',
                password: '',
            }
        },
        validations: {
            username: {
                required,
                maxLength: maxLength(10)
            },
            password: {
                required,
                minLength: minLength(4)
            },
        },
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.username.$dirty) return errors;
                !this.$v.username.maxLength && errors.push('Name must be at most 10 characters long');
                !this.$v.username.required && errors.push('Name is required.');
                return errors
            },
            passwordErrors() {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required')
                !this.$v.password.minLength && errors.push('Password must be at least 4 characters long')
                return errors
            },
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (this.empty(this.nameErrors)&& this.empty(this.passwordErrors)) {
                    this.httpPost({
                        nome: this.username,
                        senha: this.password,
                    });
                }
            },
            httpPost(data) {
                this.$http.post(Config.URL_API + 'logar', data, {
                    headers: {'Content-Type': 'application/json'}
                }).then((response) => {
                    const token = response.data;
                    this.$notify({text: 'Logado com sucesso', type: 'success'});
                    this.$router.push({name: 'home', params: { token: token }})
                }).catch((err) => {
                    this.$notify({title: 'Erro', text: err.response.data.error, type: 'error'});
                })
            },
            empty(array) {
                return array.length === 0
            }
        },
    }
</script>

<style scoped>
</style>