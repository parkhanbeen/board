package kr.co.community.board.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import kr.co.community.board.service.BoardService;
import kr.co.community.common.interceptor.CommonInterceptor;
import kr.co.community.repository.vo.Account;
import kr.co.community.repository.vo.Board;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

@Controller
@RequestMapping("board")
public class BoardController {
	
	@Autowired
	private BoardService service;
	
	private String search;
	private String word;
	private int pageNo;
	
	protected Log log = LogFactory.getLog(CommonInterceptor.class);
	
	@RequestMapping("home.do")
	public String home(){
		return "/board/home";  
	}

	// 전체 목록 + 페이징
	@RequestMapping("list.do")
	public String list(Model model,Board board){
		board.setWord(word);
		board.setSearch(search);
		Map<String,Object> result = service.selectAllPaging(board);
		model.addAttribute("list", result.get("list"));
		model.addAttribute("pageResult",result.get("pageResult"));
		model.addAttribute("b",board);
		return "board/board.tiles";  
	}	
	
	// 검색
	@RequestMapping("search.do")
	@ResponseBody
	public Map<String,Object> search(Board board){
		this.search = board.getSearch();
		this.word = board.getWord();
		Map<String,Object> result = service.selectAllPaging(board);
		return result;  
	}
	
	// 글 등록 폼이동
	@RequestMapping("writeForm.do")
	public String WriteForm(){
		return "board/writeForm.tiles";
	}
	
	// 글 등록
	@RequestMapping("write.do")
	public String write(Board board,HttpServletRequest request){
		HttpSession session = request.getSession();
		Account account = (Account) session.getAttribute("account");
		board.setWriterNo(account.getNo());
		service.writeBoard(board);
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + "list.do";
	}
	
	// 조회수 
	@RequestMapping(value="viewCnt/{no}"  , method = RequestMethod.GET )
	public void viewCnt(@PathVariable("no") int no) throws Exception{		
		service.viewCnt(no);		
	}
	
	// 상세페이지 이동
	@RequestMapping(value="detail.do",produces="text/plain;charset=UTF-8")
	public String detail(Board board, Model model) throws Exception{		
		model.addAttribute("board", service.selectDatil(board.getNo()));
		board.setWord(word);
		board.setSearch(search);
		model.addAttribute("b", board);
		log.info("board param = " + board.getSearch() +","+  board.getWord());
		pageNo = board.getPageNo();
		return "board/detail.tiles";
	}
	
	// 글 수정폼 이동
	@RequestMapping(value="updateForm.do",produces="text/plain;charset=UTF-8")
	public String updateForm(Board board,Model model){
		model.addAttribute("board",service.selectDatil(board.getNo()) );
		model.addAttribute("b", board);
		return "board/updateForm.tiles";
	}
	
	// 글 수정
	@RequestMapping("update.do")
	public String update(Board board){
		service.updateBoard(board);
		String url = "&pageNo=" + pageNo + "&search=" + search + "&word=" + word;
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + "detail.do?no=" + board.getNo() + url ;
	}
	
	// 글 삭제
	@RequestMapping("delete.do")
	public String delete(int no){
		service.deleteBoard(no);
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + "list.do";
	}

}
