<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<header class="main-header">
    <!-- Logo -->
    <a href="#" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>CT</b>L</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>CenTer</b>Link</span>
    </a>

    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Messages: style can be found in dropdown.less-->
          <li class="dropdown messages-menu">
            <!-- Menu toggle button -->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-envelope-o"></i>
              <span class="label label-success">4</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 4 messages</li>
              <li>
                <!-- inner menu: contains the messages -->
                <ul class="menu">
                  <li><!-- start message -->
                    <a href="#">
                      <div class="pull-left">
                        <!-- User Image -->
                        <img id="sideImg" src="/local_images/${account.no}.jpg" onerror="this.src='/local_images/default.jpg'" class="img-circle proImg" alt="User Image">
                      </div>
                      <!-- Message title and timestamp -->
                      <h4>
                        Support Team
                        <small><i class="fa fa-clock-o"></i> 5 mins</small>
                      </h4>
                      <!-- The message -->
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                  <!-- end message -->
                </ul>
                <!-- /.menu -->
              </li>
              <li class="footer"><a href="#">See All Messages</a></li>
            </ul>
          </li>
          <!-- /.messages-menu -->

          <!-- Notifications Menu -->
          <li class="dropdown notifications-menu">
            <!-- Menu toggle button -->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning">10</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 10 notifications</li>
              <li>
                <!-- Inner Menu: contains the notifications -->
                <ul class="menu">
                  <li><!-- start notification -->
                    <a href="#">
                      <i class="fa fa-users text-aqua"></i> 5 new members joined today
                    </a>
                  </li>
                  <!-- end notification -->
                </ul>
              </li>
              <li class="footer"><a href="#">View all</a></li>
            </ul>
          </li>
          <!-- Tasks Menu -->
          <li class="dropdown tasks-menu">
            <!-- Menu Toggle Button -->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-flag-o"></i>
              <span class="label label-danger">9</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 9 tasks</li>
              <li>
                <!-- Inner menu: contains the tasks -->
                <ul class="menu">
                  <li><!-- Task item -->
                    <a href="#">
                      <!-- Task title and progress text -->
                      <h3>
                        Design some buttons
                        <small class="pull-right">20%</small>
                      </h3>
                      <!-- The progress bar -->
                      <div class="progress xs">
                        <!-- Change the css width attribute to simulate progress -->
                        <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar"
                             aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <!-- end task item -->
                </ul>
              </li>
              <li class="footer">
                <a href="#">View all tasks</a>
              </li>
            </ul>
          </li>
          <!-- User Account Menu -->
          <li class="dropdown user user-menu">
            <!-- Menu Toggle Button -->
            <a href="#" id="myPage_btn" class="dropdown-toggle" data-toggle="dropdown">
              <!-- The user image in the navbar-->
              <img id="headImg" src="/local_images/${account.no}.jpg" onerror="this.src='/local_images/default.jpg'" class="user-image proImg" alt="User Image">
              <!-- hidden-xs hides the username on small devices so only the image appears. -->
              <span class="hidden-xs disName">${account.name}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- The user image in the menu -->
              <li class="user-header">
                <img  src="/local_images/${account.no}.jpg" onerror="this.src='/local_images/default.jpg'" class="img-circle proImg" alt="User Image">

                <p>
                  Park han been - Web Developer
                  <small>Member since Nov. 2012</small>
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
                <!-- /.row -->
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  
  
  <div id="modal">
    <div class="modal-bg">
        <div class="modal-cont">
            <a href="#" class="close close1">
                <svg viewBox="0 0 24 24">
                  <path id="XMLID_6_" d="M23.4,21.9l-10-9.9l10-9.9c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-10,9.9L2,0.8c-0.4-0.4-1-0.4-1.4,0
	c-0.4,0.4-0.4,1,0,1.4l10,9.9l-10,9.9c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l10-9.9l10,9.9
	c0.2,0.2,0.4,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3C23.8,23,23.8,22.3,23.4,21.9z"/>  
                </svg>
            </a>
            <div id="myPageForm" class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">My Page</h3>
                </div>

                <form role="form" enctype="multipart/form-data" id="userForm" method="put">
                    <div class="card-body">
                     <div id="userImg" class="pull-left">
                        <!-- User Image -->
                        <img id="img_modify" data-no="${account.no}" src="/local_images/${account.no}.jpg" onerror="this.src='/local_images/default.jpg'" class="img-circle proImg" alt="User Image">
                        <input id="user_imgUpload" type="file" name="attach" style="display:none";>
                      </div>
                    <div class="profile-user-info">
                      <div class="profile-info-row">                
						<div class="profile-info-name">userID</div>
						<div id="userId" class="profile-info-value">${account.id }</div>					    
					  </div>
					  <div class="profile-info-row">                
						<div class="profile-info-name">userName</div>
						<div id="userName" class="profile-info-value">${account.name }</div>					    
					  </div>
					  <div class="profile-info-row">                
						<div class="profile-info-name">email</div>
						<div id="userEmail" class="profile-info-value">${account.email }</div>					    
					  </div>
					  <div class="profile-info-row">                
						<div class="profile-info-name">createDate</div>
						<div class="profile-info-value"><fmt:formatDate value="${account.createDate }" pattern="yyyy-MM-dd HH:mm:ss"/></div>					    
					  </div>
					</div>

                    </div>
                    <div class="card-footer">
                        <button type="button" id="modify_btn" class="btn btn-primary">수정</button>
                        <button type="button" id="modifySuccess_btn" class="btn btn-primary" style="display:none">수정완료</button>
                        <button type="button" id="modifyCancle_btn" class="btn btn-danger" style="display:none">취소</button>
                        <button type="button" id="modifyPass_btn" class="btn btn-primary">비밀번호 변경</button>
                        <button type="button" id="modifyWithdraw_btn" class="btn btn-danger">탈퇴</button>
                    </div>
                </form>
            </div>
            <div id="passwordForm" class="card card-primary" style="display:none;">
                <div class="card-header">
                    <h3 class="card-title">Change Password</h3>
                </div>

                    <div class="card-body">
                    <div class="">
                      <div class="passwordDiv">                
						<div class="passwordTitle">Current Password</div>
						<div id="userCurrentPass" class=""><input id="currentPass" class="passwordInput" type="password" placeholder="현재 비밀번호를 입력하세요."></div>					    
					  </div>
					  <div class="passwordDiv">                
						<div class="passwordTitle">Reset password</div>
						<div id="userResetpass" class=""><input id="resetpass" class="passwordInput" type="password" placeholder="새 비밀번호를 입력하세요."></div>					    
					  </div>
					  <div class="passwordDiv">                
						<div class="passwordTitle">Confirm Reset password</div>
						<div id="userConfirmResetpass" class=""><input id="confirmResetpass" class="passwordInput" type="password" placeholder="새 비밀번호를 다시 입력하세요."></div>					    
					  </div>
					</div>

                    </div>
                    <div class="card-footer">
                        <button type="button" id="passChange_btn" class="btn btn-primary">수정</button>
                        <button type="button" id="passChangeCancle_btn" class="btn btn-danger">취소</button>
                    </div>
            </div>
        </div>
    </div>
</div>

  
  