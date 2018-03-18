<template>
<form id="smart-form-register" class="smart-form client-form">
    <header>
        Registration is FREE*
    </header>

    <fieldset>
        <section>
            <label class="input"> <i class="icon-append fa fa-user"></i>
                <input type="text" name="username" v-model="username" placeholder="Username">
                <b class="tooltip tooltip-bottom-right">Needed to enter the website</b> </label>
        </section>

        <section>
            <label class="input"> <i class="icon-append fa fa-envelope"></i>
                <input type="email" name="email" v-model="email" placeholder="Email address">
                <b class="tooltip tooltip-bottom-right">Needed to verify your account</b> </label>
        </section>

        <section>
            <label class="input"> <i class="icon-append fa fa-lock"></i>
                <input type="password" name="password" v-model="password" placeholder="Password" id="password">
                <b class="tooltip tooltip-bottom-right">Don't forget your password</b> </label>
        </section>

        <section>
            <label class="input"> <i class="icon-append fa fa-lock"></i>
                <input type="password" name="passwordConfirm" v-model="passwordConfirm" placeholder="Confirm password">
                <b class="tooltip tooltip-bottom-right">Don't forget your password</b> </label>
        </section>
    </fieldset>

    <footer>
        <button type="submit" class="btn btn-primary" @click="submit($event)">
            Register
        </button>
    </footer>

    <div class="message">
        <i class="fa fa-check"></i>
        <p>
            Thank you for your registration!
        </p>
    </div>
</form>
</template>
<script>
export default {
    name: 'RegisterForm',
    data: function(){
        return {
            username:'',
            email: '',
            password: '',
            passwordConfirm: '',
        }
    },
    methods: {
        submit(e){
            e.preventDefault();
            const vm = this;
            this.$http.put('/user', {
                username:vm.username,
                email:vm.email,
                password:vm.password
            }).then((res) => {
                $("#smart-form-register").addClass('submited');
                // console.log(res.data)
            });
                
        }
    },
    mounted: function(){
        // Validation
        $("#smart-form-register").validate({
            // Rules for form validation
            rules : {
                username : {
                    required : true
                },
                email : {
                    required : true,
                    email : true
                },
                password : {
                    required : true,
                    minlength : 6,
                    maxlength : 20
                },
                passwordConfirm : {
                    required : true,
                    minlength : 6,
                    maxlength : 20,
                    equalTo : '#password'
                },
            },

            // Messages for form validation
            messages : {
                login : {
                    required : 'Please enter your login'
                },
                email : {
                    required : 'Please enter your email address',
                    email : 'Please enter a VALID email address'
                },
                password : {
                    required : 'Please enter your password'
                },
                passwordConfirm : {
                    required : 'Please enter your password one more time',
                    equalTo : 'Please enter the same password as above'
                },
            },
            // Do not change code below
            errorPlacement : function(error, element) {
                error.insertAfter(element.parent());
            }
        });
    }
}
</script>