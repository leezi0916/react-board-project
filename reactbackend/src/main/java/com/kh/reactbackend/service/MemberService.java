package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.MemberDto;

import java.util.List;

public interface MemberService {
    String createMember(MemberDto.Create createDto);
    List<MemberDto.Response> findAllMembers();
    MemberDto.Response loginMember(String userId, String userPwd);
    MemberDto.Response updateMember(String userId, MemberDto.Update updateDto);
}
