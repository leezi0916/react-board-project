package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.MemberDto;
import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    @Override
    public String createMember(MemberDto.Create createDto) {
        Member member = createDto.toEntity();
        memberRepository.save(member);
        return "";
    }

    @Transactional(readOnly = true)
    @Override
    public List<MemberDto.Response> findAllMembers() {
        return memberRepository.findAll().stream()
                .map(MemberDto.Response::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public MemberDto.Response loginMember(String userId, String userPwd) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("id를 찾을 수 없슨니다."));
        if(!member.getUserPwd().equals(userPwd)) {
            throw new IllegalArgumentException("비밀번호가 일치 하지 않습니다.");
        }
        return MemberDto.Response.toDto(member);
    }

    @Override
    public MemberDto.Response updateMember(String userId, MemberDto.Update updateDto) {
        System.out.println(userId);
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        System.out.println("오류 : " + member);
        member.updateMemberInfo(
                updateDto.getName(),
                updateDto.getAge(),
                updateDto.getIs_online()
        );
        return MemberDto.Response.toDto(member);
    }
}
