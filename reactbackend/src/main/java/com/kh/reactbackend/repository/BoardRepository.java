package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Board;
import com.kh.reactbackend.enums.CommonEnums;

import java.util.List;
import java.util.Optional;

public interface BoardRepository {
    Long save(Board board);
    List<Board> findAll(CommonEnums.Status status);
    Optional<Board> findById(Long id);
    void delete(Board board);
}
