<template>
<form id="login-form" class="smart-form client-form">
    <header>
        Sign In
    </header>
    <fieldset>
        <section>
            <label class="label">User Name</label>
            <label class="input"> <i class="icon-append fa fa-user"></i>
                <input type="username" name="username" v-model="username">
                <b class="tooltip tooltip-top-right"><i class="fa fa-user txt-color-teal"></i> Please enter username</b></label>
        </section>
        <section>
            <label class="label">Password</label>
            <label class="input"> <i class="icon-append fa fa-lock"></i>
                <input type="password" name="password" v-model="password">
                <b class="tooltip tooltip-top-right"><i class="fa fa-lock txt-color-teal"></i> Enter your password</b> </label>
            <div class="note">
                <a href="#">Forgot password?</a>
            </div>
        </section>
        <section>
            <label class="checkbox">
                <input type="checkbox" name="remember" checked="">
                <i></i>Stay signed in</label>
        </section>
    </fieldset>
    <footer>
        <button type="submit" class="btn btn-primary" @click="submit($event)">
            Sign in
        </button>
    </footer>
</form>
</template>
<script>
// import { mapState } from 'vuex'
import router from '@/router'
export default {
    name: 'LoginForm',
    data: function(){
        return {
            username:'',
            password: '',
        }
    },
    methods: {
        submit(e){
            e.preventDefault();
            const vm = this;
            // if(!vm.username || !vm.password)return;
            vm.$store.commit('auth',{auth: true});
            vm.$router.push(vm.$route.query.redirect);
            // this.$http.post('/user/auth', {username:vm.username,password:vm.password})
            //     .then((res) => {
            //         if(res.data.login){
            //             vm.$store.commit('auth',{auth: true});
            //             vm.$router.push(vm.$route.query.redirect);
            //         } else {
            //             console.log(res.data)
            //         }
            //     });
        }
    },
    mounted: function(){
        // Validation
        $("#login-form").validate({
            // Rules for form validation
            rules : {
                username : {
                    required : true,
                    // username : true
                },
                password : {
                    required : true,
                    minlength : 6,
                    maxlength : 20
                }
            },
            // Messages for form validation
            messages : {
                user : {
                    required : 'Please enter your user name',
                    // username : 'Please enter a VALID user name'
                },
                password : {
                    required : 'Please enter your password'
                }
            },

            // Do not change code below
            errorPlacement : function(error, element) {
                error.insertAfter(element.parent());
            }
        });
    }
}
</script>