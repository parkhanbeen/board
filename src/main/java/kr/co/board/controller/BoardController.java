package kr.co.board.controller;

import java.util.Map;

import kr.co.board.repository.vo.Board;
import kr.co.board.service.BoardService;

import org.apache.catalina.connector.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	
	@RequestMapping("home.do")
	public String home(){
		return "/board/home";  
	}

	// 전체 목록 + 페이징
	@RequestMapping("list.do")
	public String list(Model model,Board board){
		Map<String,Object> result = service.selectAllPaging(board);
		model.addAttribute("list", result.get("list"));
		model.addAttribute("pageResult",result.get("pageResult"));
		model.addAttribute("b",board);
		return "board/board.tiles";  
	}	
	
	@RequestMapping("search.do")
	@ResponseBody
	public Map<String,Object> search(Board board){
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
	public String write(Board board){
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
		model.addAttribute("b", board);
		search = board.getSearch();
		word = board.getWord();
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
