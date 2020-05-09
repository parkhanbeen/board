package kr.co.community.board.service;

import java.util.List;
import java.util.Map;

import kr.co.community.repository.vo.Board;

public interface BoardService {
	List<Board> selectAll();
	
	void writeBoard(Board board);
	
	Board selectDatil(int no);
	
	void viewCnt(int no);
	
	void updateBoard(Board board);
	
	void deleteBoard(int no);
	
	Map<String,Object> selectAllPaging(Board board);

}
