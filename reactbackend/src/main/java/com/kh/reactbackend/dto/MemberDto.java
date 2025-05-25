package com.kh.reactbackend.dto;

import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.enums.CommonEnums;
import lombok.*;

import java.time.LocalDateTime;

public class MemberDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create {
        private String user_id;
        private String user_pwd;
        private String name;
        private String nickname;
        private String gender;
        private String genre;
        private Integer age;
        private Boolean is_online;

        public Member toEntity() {
            return Member.builder()
                    .userId(this.user_id)
                    .userPwd(this.user_pwd)
                    .name(this.name)
                    .nickname(this.nickname)
                    .gender(this.gender)
                    .genre(this.genre)
                    .age(this.age)
                    .isOnline(this.is_online)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {

        private String user_id;
        private String user_pwd;
        private String name;
        private String nickname;
        private String gender;
        private String genre;
        private Integer age;
        private Boolean is_online;
        private LocalDateTime modifyDate;
        private LocalDateTime enrollDate;
        private CommonEnums.Status status;

        public static Response toDto(Member member) {
            return Response.builder()
                    .user_id(member.getUserId())
                    .name(member.getName())
                    .nickname(member.getNickname())
                    .gender(member.getGender())
                    .genre(member.getGenre())
                    .age(member.getAge())
                    .is_online(member.getIsOnline())
                    .enrollDate(member.getEnrollDate())
                    .modifyDate(member.getModifyDate())
                    .status(member.getStatus())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Login {
        private String user_id;
        private String user_pwd;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Update {

        private String name;
        private Integer age;
        private Boolean is_online;
    }
}
