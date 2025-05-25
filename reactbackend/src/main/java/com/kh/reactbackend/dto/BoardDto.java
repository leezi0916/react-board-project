package com.kh.reactbackend.dto;

import com.kh.reactbackend.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class BoardDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Create{
        private String writer;
        private String title;
        private String game;
        private String content;

        public Board toEntity(){
            return Board.builder()
                    .title(this.title)
                    .game(this.game)
                    .content(this.content)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response {

        private Long board_no;
        private String title;
        private String writer;
        private String game;
        private String content;

        public static Response toDto(Board board){
            return Response.builder()
                    .board_no(board.getBoardNo())
                    .title(board.getTitle())
                    .writer(board.getMember().getUserId())
                    .game(board.getGame())
                    .content(board.getContent())
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Update {
        private String title;
        private String game;
        private String content;



        public Board toEntity() {
            return Board.builder()
                    .title(this.title)
                    .game(this.game)
                    .content(this.content)
                    .build();
        }
    }


}
