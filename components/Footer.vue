<template>
  <footer class="footer">
    <div class="footer__icons">
      <a href="https://github.com/StRenedas" class="footer__logo_link"><img src="../static/GitHub-Mark-Light-32px.png" alt="ghicon" class="footer__logo"></a>
      <a href="https://vk.com/renedas" class="footer__logo_link"><img src="../static/VK_Monochrome_Compact_Logo.png" alt="vkicon" class="footer__logo"></a>
    </div>
    <p class="footer__copyright">&copy; Stanislav Sosedov</p>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  width: 100%;
  height: auto;
  background-color: #151212;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.footer__logo {
  width: 32px;
  height: 32px;
  margin: 7px 3px 2px;
}
.footer__copyright {
  color: white;
  text-align: center;
  padding: 7px;
}
</style>
