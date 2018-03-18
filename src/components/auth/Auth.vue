<template>
<div id="extr-page" class="animated fadeInDown">
<header id="header">
    <div id="logo-group">
        <span id="logo"> <img src="static/img/logo.png" alt="Make Center"> </span>
    </div>
    <span v-if="showLogin" id="extr-page-header-space"> <span class="hidden-mobile hiddex-xs">Need an account?</span> <a href="javascript:void(0);" class="btn btn-danger" @click="action(false)">Create account</a> </span>
    <span v-else id="extr-page-header-space"> <span class="hidden-mobile hiddex-xs">Already registered?</span> <a href="javascript:void(0);" class="btn btn-danger" @click="action(true)">Sign In</a> </span>
</header>
<!-- MAIN CONTENT -->
<div id="content" class="container">

    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-7 hidden-xs hidden-sm" 
            :class="{'col-lg-8':showLogin,'col-lg-7':!showLogin}">
            <h1 class="txt-color-red login-header-big">Make Center</h1>
            <div class="hero">

                <div class="pull-left login-desc-box-l">
                    <h4 class="paragraph-header">It's Okay to be Smart. Experience the simplicity of SmartAdmin, everywhere you go!</h4>
                    <div class="login-app-icons">
                        <a href="http://www.servasoftware.com/" target="_blank" class="btn btn-danger btn-sm">Visualization</a>
                        <a href="http://www.servasoftware.com/download.html" target="_blank" class="btn btn-danger btn-sm">Download</a>
                    </div>
                </div>
                
                <img src="static/img/demo/iphoneview.png" class="pull-right display-image" alt="" style="width:210px">

            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h5 class="about-heading">About Make Center</h5>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
                    </p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h5 class="about-heading">Not just your average template!</h5>
                    <p>
                        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi voluptatem accusantium!
                    </p>
                </div>
            </div>

        </div>
        <div class="col-xs-12 col-sm-12 col-md-5" 
            :class="{'col-lg-4':showLogin,'col-lg-5':!showLogin}">
            <div class="well no-padding">
                <login-form v-if="showLogin"></login-form>
                <register-form v-else></register-form>
            </div>
            
        </div>
    </div>
</div>

</div>
</template>
<script>
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
export default {
    name: 'Auth',
    data: function(){
        return {
            showLogin: true,
        }
    },
    methods: {
        action(isLogin){
            // this.showLogin = isLogin;
        }
    },
    components: {
        LoginForm,
        RegisterForm
    }
}
</script>