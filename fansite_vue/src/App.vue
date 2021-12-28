<template>
  <div id="nav">
    <router-link to="/" v-if="$isLogin()"><div class="htit">IU</div></router-link> 
    <router-link to="/news/list" v-if="$isLogin()"><div class="htit">News</div></router-link>
    <router-link to="/my_info" v-if="$isLogin()"><div class="htit">My info</div></router-link>
    <router-link to="/board" v-if="$isLogin()"><div class="htit">Board</div></router-link>
    <router-link to="/join" v-else><div class="htit">Join</div></router-link>
    <router-link to="/logout" v-if="$isLogin()"><div class="htit">Logout</div></router-link>
    <router-link to="/login" v-else><div class="htit">Login</div></router-link>
  </div>
  <div class="hline">Welcome to IU fansite</div>
  <router-view/>
</template>

<style>
</style>