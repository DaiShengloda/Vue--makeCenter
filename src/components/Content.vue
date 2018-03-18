<template>
  <div id="app">
    <page-header></page-header>
    <side-menu></side-menu>
    <!-- MAIN PANEL -->
    <div id="main" role="main">
      <ribbon></ribbon>
      <router-view></router-view>
    </div>
    <!-- END MAIN PANEL -->
    <page-footer></page-footer>
  </div>
</template>
<script>
import PageHeader from './PageHeader'
import SideMenu from './SideMenu'
import Ribbon from './Ribbon'
import PageFooter from './PageFooter'
export default {
  name: 'MyContent',
  components: {
    PageHeader,
    SideMenu,
    Ribbon,
    PageFooter
  }
}
</script>