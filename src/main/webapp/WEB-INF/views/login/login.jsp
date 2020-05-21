<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="/bower_components/jquery/dist/jquery.min.js"></script>
 <%@ include file="../../tiles/tiles-plugin_js.jsp" %>
<link rel="stylesheet" href="/resources/css/login.css">
<div class="login-page">
  <div class="form">
    <form class="register-form">
      <input id="id_reg" type="text" placeholder="id"/>
      <input id="pass_reg" type="password" placeholder="password" autocomplete="new-password"/>
      <input id="name_reg" type="text" placeholder="name" />
      <input id="email_reg" type="text" placeholder="email address"/>
      <button id="register_Btn" type="button">create</button>
      <p class="message">Already registered? <a href="#">Sign In</a></p>
    </form>
    <form class="login-form">
      <input id="id_lg" class="login_txt" type="text" placeholder="id"/>
      <input id="pass_lg" class="login_txt" type="password" placeholder="password" autocomplete="new-password"/>
      <div id="result_msg" class="result_msg" style="display: none;">       
      </div>
      <button id="login_Btn" type="button">login</button>
      <p class="message">Not registered? <a href="#">Create an account</a></p>
      <p class="message_id">Have you forgotten your id? <a href="#">Forgot your ID</a></p>
      <p class="message_password">Have you forgotten your password? <a href="#">Forgot your password</a></p>
    </form>
  </div>
</div>

<script src="/resources/js/login.js"></script>