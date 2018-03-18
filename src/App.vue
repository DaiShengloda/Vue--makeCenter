<template>
  <router-view></router-view>
</template>
<script>
import MyContent from '@/components/Content'
import Auth from '@/components/auth/Auth'
// import PageHeader from '@/components/PageHeader'
// import SideMenu from '@/components/SideMenu'
// import Ribbon from '@/components/Ribbon'
// import PageFooter from '@/components/PageFooter'
export default {
  name: 'app',
  components: {
    MyContent,
    Auth
    // PageHeader,
    // SideMenu,
    // Ribbon,
    // PageFooter
  }
}
</script>


