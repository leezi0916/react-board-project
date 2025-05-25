package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    void save(Member member);
    List<Member> findAll();
    Optional<Member> findById(String userId);

}
