<script setup lang="ts">
import router from '@/router/index';
import { ref } from 'vue';
import type {Ref} from 'vue';
import type {User} from '@/interfaces/userInterface';
import { useAccountStore } from '@/stores/AccountStore';
import IconCheckmark from './icons/IconCheckmark.vue';
import passwordField from '@/components/GlobalPasswordField.vue';

const accountStore = useAccountStore();

const userInformation:Ref<User> = ref({
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
});

const confirmationPassword = ref('');
const acceptTermsOfUse = ref(false);

const passwordEqual = ref(true);
const strongPasword = ref(true);
const strongPasswordLength = ref(false);
const PasswordHasUpperCase = ref(false);
const PasswordHasLowerCase = ref(false);
const PasswordHasDigit = ref(false);
const PasswordHasSpecialChar = ref(false);

const alreadyHaveAnAccount = ref(false);

const signup = (event: Event) => {
    event.preventDefault();

    passwordEqual.value = userInformation.value.password === confirmationPassword.value;

    strongPasword.value = strongPasswordLength.value && 
                        PasswordHasUpperCase.value && PasswordHasLowerCase.value && 
                        PasswordHasDigit.value && PasswordHasSpecialChar.value;

    if(passwordEqual.value && strongPasword.value){

        accountStore.signup(userInformation.value).then(result => {
            if(result) {
                router.push('/');

            } else {
                alreadyHaveAnAccount.value = true;
            }
        })
    }
};


function isStrongPassword() {
  const minLength = 8;
  strongPasswordLength.value = userInformation.value.password.length >= minLength;
  PasswordHasUpperCase.value = /[A-Z]/.test(userInformation.value.password);
  PasswordHasLowerCase.value = /[a-z]/.test(userInformation.value.password);
  PasswordHasDigit.value = /[0-9]/.test(userInformation.value.password);
  PasswordHasSpecialChar.value = /[!@#$%^&*()\-_=+[\]{}|;:'",.<>/?]/.test(userInformation.value.password);

  if(!strongPasword.value) {
    strongPasword.value = strongPasswordLength.value && 
                        PasswordHasUpperCase.value && PasswordHasLowerCase.value && 
                        PasswordHasDigit.value && PasswordHasSpecialChar.value;
  }
}

</script>

<template>
    <section class="form-container">
        <h1 class="title">Rejoignez l'aventure</h1>
        <div class="divider">
            Inscription avec
        </div>
        <div class="row">
            <button class="primary-button">Google</button>
            <button class="primary-button">LinkedIn</button>
            <button class="primary-button">Facebook</button>
        </div>
        <div class="divider">
            ou
        </div>

        <form v-on:submit="signup">
            <input class="text-field" required type="text" id="Name" name="Name" placeholder="Prénom" v-model="userInformation.firstname" />
            <input class="text-field" required type="text" id="LastName" name="LastName" placeholder="Nom" v-model="userInformation.lastname"/>
            <input class="text-field" required type="email" id="Email" name="Email" placeholder="Email" v-model="userInformation.email"/>

            <passwordField v-model:password="userInformation.password" :error="!strongPasword"
                            @input="isStrongPassword">
            </passwordField>
                <ul class="password-requirements" :class="{'password-requirement-error': !strongPasword}">
                    <li class="password-requirement-item" :class="{'text-valid': strongPasswordLength}">
                        <IconCheckmark class="check-icon" :class="{'icon-valid': strongPasswordLength}"></IconCheckmark> 
                        8 caractères minimum
                    </li>
                    <li class="password-requirement-item" :class="{'text-valid': PasswordHasLowerCase}">
                        <IconCheckmark class="check-icon" :class="{'icon-valid': PasswordHasLowerCase}"></IconCheckmark>
                         1 lettre minuscule minimum
                    </li>
                    <li class="password-requirement-item" :class="{'text-valid': PasswordHasUpperCase}">
                        <IconCheckmark class="check-icon" :class="{'icon-valid': PasswordHasUpperCase}"></IconCheckmark>
                         1 lettre majuscule minimum
                    </li>
                    <li class="password-requirement-item" :class="{'text-valid': PasswordHasDigit}">
                        <IconCheckmark class="check-icon" :class="{'icon-valid': PasswordHasDigit}"></IconCheckmark>
                         1 chiffre minimum
                    </li>
                    <li class="password-requirement-item" :class="{'text-valid': PasswordHasSpecialChar}">
                        <IconCheckmark class="check-icon" :class="{'icon-valid': PasswordHasSpecialChar}"></IconCheckmark>
                         1 caractère spécial minimum
                    </li>
                </ul>


            <passwordField v-model:password="confirmationPassword" 
                            placeholder="Confirmation du mot de passe"
                            :error="!passwordEqual">
            </passwordField>
            <p class="text-error" v-if="!passwordEqual">Les mots de passes sont différents!</p>


            <label class="checkbox-label margin-top">
                <input type="checkbox" id="TermsOfUse" name="TermsOfUse" v-model="acceptTermsOfUse">
                J'accepte les Conditions générales d'utilisation
            </label>

            <p v-if="alreadyHaveAnAccount" class="text-error">Vous avez déjà un compte avec cette adresse mail.</p>

            <button class="primary-button" :disabled="!acceptTermsOfUse">Se connecter</button>
        </form>
    </section>
</template>

<style lang="scss" scoped>
@import '../assets/main.scss';

.row {
    display: flex;
    gap: 1rem;
}

.title {
    font-size: 2.1875rem;
    font-weight: 700;
}
.password-requirements {
    list-style: none;
    margin: 0 1.5rem;
    padding: 0.5rem 0.8rem;
    background-color: $primaryContainer;
    color: $onBackground-80;
    border-radius: 0.6rem;
}
.password-requirement-error{
    border: solid 1px $error;
}

.password-requirement-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin: 0;
    font-size: 0.8rem;

    .check-icon {
        width: 0.7rem;
        height: 0.7rem;
        fill: $onBackground;
    }

    .icon-valid {
        fill: $primary;
        width: .8rem;
        height: .8rem;
        stroke-width: 1;
        stroke: $primary;
    }
}

.text-valid {
    color:$primary;
    font-weight: 600;
}

.text-error {
    color: $error;
    font-size: 0.9rem;
    margin-left: 1.5rem;
}

.margin-top {
    margin-top: 1rem;
}
</style>