package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MemberRepositoryImpl implements MemberRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void save(Member member) {
        em.persist(member);
    }

    @Override
    public List<Member> findAll() {
        //JPQL : 엔티티 기반 쿼리를 전달하는 방법 (Member는 엔티티임),
        // 별칭은 무조건 붙여야함,
        // return을 Member.class이녀석으로 받을거다
        //getResultList는 리스트로 반환하겠다!
        return em.createQuery("select m from Member m", Member.class).getResultList();
    }

    @Override
    public Optional<Member> findById(String userId) {
        return Optional.ofNullable(em.find(Member.class, userId));
    }
}
