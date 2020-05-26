<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="/bower_components/jquery/dist/jquery.min.js"></script>
 <%@ include file="../../tiles/tiles-plugin_js.jsp" %>
<link rel="stylesheet" href="/resources/css/login.css">
<div class="login-page">
  <div class="form">
    <form class="register-form">
      <input id="id_reg" type="text" placeholder="id"/>
      <div id="result_reg_msg" class="result_reg_msg" style="display: none;">      
      </div>
      <input id="pass_reg" type="password" placeholder="password" autocomplete="new-password"/>
      <input id="name_reg" type="text" placeholder="name" />
      <input id="email_reg" type="email" placeholder="email address"/>
      <button id="register_Btn" type="button">create</button>
      <p class="message">Already registered? <a id="signIn_btn" href="#">Sign In</a></p>
    </form>
    <form class="login-form">
      <input id="id_lg" class="login_txt" type="text" placeholder="id"/>
      <input id="pass_lg" class="login_txt" type="password" placeholder="password" autocomplete="new-password"/>
      <div id="result_lg_msg" class="result_lg_msg" style="display: none;">       
      </div>
      <button id="login_Btn" type="button">login</button>
      <p class="message">Not registered? <a href="#">Create an account</a></p>
      <p class="message_id">Have you forgotten your id? <a id="forgotId_modal" href="#">Forgot your ID</a></p>
      <p class="message_password">Have you forgotten your password? <a href="#">Forgot your password</a></p>
    </form>
  </div>
</div>


<div class="modal fade" tabindex="-1" role="dialog" id="myModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Find ID</h4>
      </div>
      <div class="modal-body">
       	 <input id="findId_name" class="modal_input" type="text" placeholder="name" />
     	 <input id="findId_email" class="modal_input" type="email" placeholder="email address"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button id="findId_btn" type="button" class="btn btn-primary">Find</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->



<script src="/resources/js/login.js"></script>