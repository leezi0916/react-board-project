package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Board;
import com.kh.reactbackend.enums.CommonEnums;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BoardRepositoryImpl implements BoardRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Long save(Board board) {
        em.persist(board);
        return board.getBoardNo();
    }

    @Override
    public List<Board> findAll(CommonEnums.Status status) {
        String query = "select b from Board b where b.status = :status";
        return em.createQuery(query, Board.class)
                .setParameter("status", status)
                .getResultList();
    }

    @Override
    public Optional<Board> findById(Long id) {
        if(id == null) return Optional.empty();//id가 없으면 오류나기 때문에 !
        return Optional.ofNullable(em.find(Board.class, id)); //optional은 리턴값이 null 예외처리!
    }

    @Override
    public void delete(Board board) {
        em.remove(board); //지우면 보드를 참조하고 있는 애들중 cascade옶션이 있는 애들도 같이 지워짐
    }


}
