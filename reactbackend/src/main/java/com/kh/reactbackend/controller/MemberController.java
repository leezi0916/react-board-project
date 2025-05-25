package com.kh.reactbackend.controller;

import com.kh.reactbackend.dto.MemberDto;
import com.kh.reactbackend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<String> addMember(@RequestBody MemberDto.Create createDto) {
        String userId = memberService.createMember(createDto);
        return ResponseEntity.ok(userId);
    }

    //전체 회원 조회
    @GetMapping
    public ResponseEntity<List<MemberDto.Response>> getMembers() { return ResponseEntity.ok(memberService.findAllMembers()); }

    //로그인 기능
    @PostMapping("/login")
    public ResponseEntity<MemberDto.Response> login(@RequestBody MemberDto.Login loginDto) {
        MemberDto.Response currentUser = memberService.loginMember(loginDto.getUser_id(),loginDto.getUser_pwd());

        return ResponseEntity.ok(currentUser);
    }

    //회원 수정
    @PatchMapping("/{userId}")
    public  ResponseEntity<MemberDto.Response> updateMember(@PathVariable String userId,
                                                             @RequestBody MemberDto.Update updateDto) {
        return ResponseEntity.ok(memberService.updateMember(userId, updateDto));
    }
}
