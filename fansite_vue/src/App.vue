<template>
  <div id="nav">
    <!-- 프로필 -->
    <router-link to="/" v-if="$isLogin()"><i class='xi-home-o'></i></router-link> 
    <div class='right'>
      <router-link to="/news/list" v-if="$isLogin()"><i class='xi-view-module'></i></router-link>
      <router-link to="/my_info" v-if="$isLogin()"><i class='xi-user-o'></i></router-link>
      <router-link to="/join" v-else><i class="xi-user-plus-o"></i></router-link>
      <router-link to="/logout" v-if="$isLogin()"><i class="xi-log-out"></i></router-link>
      <router-link to="/login" v-else><i class='xi-log-in'></i></router-link>
      
  </div>
  </div>
  <router-view/>
</template>

<style>

</style>
