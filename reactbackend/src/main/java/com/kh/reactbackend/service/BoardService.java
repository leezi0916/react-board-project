package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.BoardDto;

import java.io.IOException;
import java.util.List;

public interface BoardService {
    Long createBoard(BoardDto.Create boardDto);
    List<BoardDto.Response> getAllBoards();
    BoardDto.Response getBoardDetail(Long boardNo);
    Void deleteBoard(Long boardNo);
    BoardDto.Response updateBoard(Long boardNo, BoardDto.Update boardDto) throws IOException;

}
