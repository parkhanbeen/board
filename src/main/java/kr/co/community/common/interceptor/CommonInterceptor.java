package kr.co.community.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.co.community.repository.vo.Account;

public class CommonInterceptor extends HandlerInterceptorAdapter{
	
	protected Log log = LogFactory.getLog(CommonInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if (log.isDebugEnabled()) {
            log.debug("===================       START       ===================");
            log.debug(" Request URI \t:  " + request.getRequestURI());
        }
		HttpSession session = request.getSession();
        Account loginVO = (Account) session.getAttribute("Account");
        
        if(loginVO == null){
            response.sendRedirect("/user/login");
            return false;
        }
        return true;
    }
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		if (log.isDebugEnabled()) {
            log.debug("===================        END        ===================\n");
        }

	}

}
