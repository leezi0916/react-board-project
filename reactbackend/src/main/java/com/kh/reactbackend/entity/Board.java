package com.kh.reactbackend.entity;

import com.kh.reactbackend.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "BOARD")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_NO")
    private Long boardNo;

    @Column(name = "TITLE", nullable = false, length = 30)
    private String title;

    @Column(name = "GAME", length = 30)
    private String game;

    @Column(name = "CONTENT", nullable = false)
    @Lob
    private String content;

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;

    @Column(name = "STATUS", length = 1, nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.Status status;

    @Column(name = "COUNT")
    private Integer count;

    //Board : Member (N : 1)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "WRITER")
    private Member member;

    public void changeMember(Member member) { //편의 메서드 (dto에 member를 작성하지 말고)
        this.member = member;

            member.getBoards().add(this);

    }

    public void changeContent(String content) {
        if(content != null && !content.isEmpty()) { //?
            this.content = content;
        }
    }

    public void changeTitle(String title) {
        if(title != null && !title.isEmpty()) {
            this.title = title;
        }
    }

    public void changeGame(String game) {
        if(game != null && !game.isEmpty()) {
            this.game = game;
        }
    }

    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
        this.count = 0;
        this.status = CommonEnums.Status.Y; // 기본값
    }

}
