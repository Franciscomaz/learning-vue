<template>
    <v-container class="elevation-2 mt-5" fluid style="width: 20%; min-width: 400px">
        <v-layout>
            <v-flex class="pr-5 pl-5">
                <v-form ref="form" lazy-validation>
                    <h2 class="blue--text text--darken-2">Registration</h2>
                    <v-flex>
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
                                    v-model="email"
                                    :error-messages="emailErrors"
                                    label="E-mail"
                                    required
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
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
                        <div class="pt-2">
                            <v-text-field
                                    v-model="passwordConfirmation"
                                    :error-messages="repeatedPasswordErrors"
                                    :type="'password'"
                                    label="Confirm your password"
                                    required
                                    @input="$v.passwordConfirmation.$touch()"
                                    @blur="$v.passwordConfirmation.$touch()"
                            ></v-text-field>
                        </div>
                    </v-flex>
                    <v-layout row justify-center class="pt-3">
                        <v-btn @click="submit" class="blue darken-2" style="color: white">
                            Register
                        </v-btn>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, minLength, maxLength, email, sameAs} from 'vuelidate/lib/validators'
    import Config from '../../config/config'

    export default {
        name: "Registration",
        mixins: [validationMixin],
        data() {
            return {
                username: '',
                email: '',
                password: '',
                passwordConfirmation: '',
            }
        },
        validations: {
            username: {
                required,
                maxLength: maxLength(10)
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(4)
            },
            passwordConfirmation: {
                required,
                sameAsPassword: sameAs('password')
            }
        },
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.username.$dirty) return errors;
                !this.$v.username.maxLength && errors.push('Name must be at most 10 characters long');
                !this.$v.username.required && errors.push('Name is required.');
                return errors
            },
            emailErrors() {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be a valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                return errors
            },
            passwordErrors() {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required')
                !this.$v.password.minLength && errors.push('Password must be at least 4 characters long')
                return errors
            },
            repeatedPasswordErrors() {
                const errors = [];
                if (!this.$v.passwordConfirmation.$dirty) return errors;
                !this.$v.passwordConfirmation.required && errors.push('Password confirmation is required');
                !this.$v.passwordConfirmation.sameAsPassword && errors.push('Password must be the same as the confirmation');
                return errors;
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (this.empty(this.nameErrors) && this.empty(this.emailErrors) && this.empty(this.passwordErrors) && this.empty(this.repeatedPasswordErrors)) {
                    this.httpPost();
                }
            },
            httpPost() {
                this.$http.post(Config.URL_API + 'create-user', {
                    nome: this.username,
                    email: this.email,
                    senha: this.password,

                }, {
                    headers: {'Content-Type': 'application/json'}
                }).then(() => {
                    this.$notify({text: 'Cadastro realizado com sucesso', type: 'success'});
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