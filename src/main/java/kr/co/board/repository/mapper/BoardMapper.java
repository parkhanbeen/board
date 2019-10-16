package kr.co.board.repository.mapper;

import java.util.List;

import kr.co.board.repository.vo.Board;

public interface BoardMapper {	
	List<Board> selectAll();
	void writeBoard(Board board);
	Board selectDatil(int no);
	void detailViewCnt(int no);
	void updateBoard(Board board);
	
	void deleteBoard(int no);
	
	List<Board> selectAllPaging(Board board);
	
	int selectAllCount(Board board);

}
