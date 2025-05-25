package com.kh.reactbackend.entity;

import com.kh.reactbackend.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "MEMBER")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {

    @Id
    @Column(name = "USER_ID", nullable = false, length = 30)
    private String userId;

    @Column(name = "USER_PWD", nullable = false, length = 100)
    private String userPwd;

    @Column(name = "NAME", nullable = false, length = 15)
    private String name;

    @Column(name = "NICKNAME", nullable = false, length = 30)
    private String nickname;

    @Column(name = "GENDER", nullable = false, length = 2)
    private String gender;

    @Column(name = "GENRE", nullable = false, length = 10)
    private String genre;

    @Column(name = "AGE", nullable = false)
    private Integer age;

    @Column(name = "IS_ONLINE", nullable = false)
    private Boolean isOnline;

    @Column(name = "ENROLL_DATE")
    private LocalDateTime enrollDate; //표준시간

    @Column(name = "MODIFY_DATE")
    private LocalDateTime modifyDate;

    @Column(name = "STATUS", length = 1, nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.Status status;


    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    List<Board> boards = new ArrayList<>();



    public void updateMemberInfo(String name, Integer age, Boolean isOnline) {
        if(name != null && !name.isEmpty()) {
            this.name = name;
        }
        if(age != null) {
            this.age = age;
        }

        if(isOnline != null) {
            this.isOnline = isOnline;
        }
    }

    //엔티티가 영속성 컨테스트에 저장되기 전(em.persist())에 실행되는 메서드
    //초기설정을 해두는 용도로 사용
    @PrePersist
    public void prePersist() { //default 값 설정
        this.enrollDate = LocalDateTime.now();
        this.modifyDate = LocalDateTime.now();
        if(this.status == null){
            this.status = CommonEnums.Status.Y;
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.modifyDate = LocalDateTime.now();
    }

}
