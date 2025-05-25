package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.BoardDto;
import com.kh.reactbackend.entity.Board;
import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.enums.CommonEnums;
import com.kh.reactbackend.repository.BoardRepository;
import com.kh.reactbackend.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    @Override
    public Long createBoard(BoardDto.Create boardDto) {
        // 게시글작성
        //작성자 찾기 -> 객체지향코드를 작성할 것이기 때문에 key를 직접 외래키로 insert하지않고
        //작성자를 찾아 참조해준다.
        Member member = memberRepository.findById(boardDto.getWriter())
                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

        Board board = boardDto.toEntity();

        // 작성자 설정 (연관관계 설정)
        board.changeMember(member);

        boardRepository.save(board);

        return board.getBoardNo();
    }

    @Override
    public List<BoardDto.Response> getAllBoards() {
        List<Board> boards = boardRepository.findAll(CommonEnums.Status.Y);
        return boards.stream()
                .map(BoardDto.Response ::toDto)  // 엔티티 -> DTO 변환
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public BoardDto.Response getBoardDetail(Long boardNo) {
        Board board = boardRepository.findById(boardNo)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 게시글입니다."));
        return BoardDto.Response.toDto(board);
    }

    @Transactional
    @Override
    public Void deleteBoard(Long boardNo) {
        Board board = boardRepository.findById(boardNo)
                .orElseThrow(() -> new EntityNotFoundException("게시글을 찾을 수 없습니다."));

        boardRepository.delete(board);
        return null;
    }

    @Transactional
    @Override
    public BoardDto.Response updateBoard(Long boardNo, BoardDto.Update boardDto) throws IOException {
        Board board = boardRepository.findById(boardNo)
                .orElseThrow(() -> new EntityNotFoundException("게시글을 찾을 수 없습니다."));

        board.changeContent(boardDto.getContent());
        board.changeTitle(boardDto.getTitle());
        board.changeGame(boardDto.getGame());
        return BoardDto.Response.toDto(board);
    }


}
