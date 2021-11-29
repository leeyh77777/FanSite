<template>
  
  <div class="home">
    <div class="stit">IU is</div>
    <img class="logo_img" alt="Vue logo" src="../assets/logo.png">
    <div>
    <table>
      <tbody>
        <tr>본명
        <td>이지은</td>
        </tr>
        <tr>생년월일
        <td>1993년 5월 16일</td>
        </tr>
        <tr>키
          <td>161.8cm</td>
        </tr>
        <tr>혈액형
          <td>O형</td>
        </tr>
        <tr>신발 사이즈
          <td>225mm</td>
        </tr>
        <tr>MBTI
          <td>INFJ</td>
        </tr>
        <tr>링크
          <td>
            <a href="https://www.instagram.com/dlwlrma/"><i class='xi-instagram'></i></a>
            <a href="https://twitter.com/_IUofficial"><i class='xi-twitter'></i></a>
            <a href="https://www.facebook.com/iu.loen"><i class='xi-facebook'></i></a>
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