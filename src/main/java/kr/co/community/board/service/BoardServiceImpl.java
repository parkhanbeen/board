package kr.co.community.board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.co.community.common.page.PageResult;
import kr.co.community.repository.mapper.BoardMapper;
import kr.co.community.repository.vo.Board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService{
	
	@Autowired
	private BoardMapper mapper;
	
	public List<Board> selectAll(){
		return mapper.selectAll();
	}
	
	public Map<String,Object> selectAllPaging(Board board){
		Map<String,Object> result = new HashMap<>();
		result.put("list", mapper.selectAllPaging(board));
		result.put("pageResult", new PageResult(board.getPageNo(), mapper.selectAllCount(board)));
		return result;
	}
	
	public void writeBoard(Board board){
		 mapper.writeBoard(board);
	}
	
	public void viewCnt(int no){
		mapper.detailViewCnt(no);	
	}
	
	public Board selectDatil(int no){
		return mapper.selectDatil(no);
	}
	
	public void updateBoard(Board board){
		 mapper.updateBoard(board);;
	}
	
	public void deleteBoard(int no){
		mapper.deleteBoard(no);
	}

}
