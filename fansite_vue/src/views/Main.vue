<template>
  
  <div class="home">
    <img class="logo_img" alt="Vue logo" src="../assets/logo.png" style="max-width:100%; height:auto;">
    <div class="maintit">Profile</div>
    <div>
    <table>
      <tbody class="table">
        <tr>
        <th>본명</th>
        <td>이지은</td>
        </tr>
        <tr>
        <th>생년월일</th>
        <td>1993년 5월 16일</td>
        </tr>
        <tr>
          <th>키</th>
          <td>161.8cm</td>
        </tr>
        <tr>
          <th>혈액형</th>
          <td>O형</td>
        </tr>
        <tr>
          <th>링크</th>
          <td class="link">
            <a href="https://www.instagram.com/dlwlrma/"><i class='xi-instagram'></i></a>&nbsp;
            <a href="https://twitter.com/_IUofficial"><i class='xi-twitter'></i></a>&nbsp;
            <a href="https://www.facebook.com/iu.loen"><i class='xi-facebook'></i></a>&nbsp;
            <a href="https://www.youtube.com/c/dlwlrma"><i class='xi-youtube-play'></i></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>
<script>
export default {
  created() {
    if (!this.$isLogin()) {
        this.$router.push({ path : "/login" })
    }
  }
} 
</script>