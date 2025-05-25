package com.kh.reactbackend.controller;

import com.kh.reactbackend.dto.BoardDto;
import com.kh.reactbackend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/boards")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<String> addBoard(@ModelAttribute BoardDto.Create boardDto) {
        Long boardNo = boardService.createBoard(boardDto);
        return ResponseEntity.ok(boardNo.toString());
    }

    // 전체 게시글 목록 조회
    @GetMapping
    public ResponseEntity<List<BoardDto.Response>> getAllBoards() {
        List<BoardDto.Response> boards = boardService.getAllBoards();
        return ResponseEntity.ok(boards);
    }

    // 게시글 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<BoardDto.Response> getBoard(@PathVariable("id") Long boardNo) {
        return ResponseEntity.ok(boardService.getBoardDetail(boardNo));
    }

    //게시판 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable("id") Long boardNo) {
        boardService.deleteBoard(boardNo);
        return ResponseEntity.ok().build(); //어떤 값을 리턴하는게 아니면 ResponseEntity에서 .build 사용
    }

    //게시판 수정
    @PatchMapping("/{id}") //풋보다 패치를 많이 사용
    public ResponseEntity<BoardDto.Response> updateBoard(@PathVariable("id") Long boardNo,
                                                         @ModelAttribute BoardDto.Update updateBoard) throws IOException {

        return ResponseEntity.ok(boardService.updateBoard(boardNo, updateBoard));
    }
}
