package cn.xilio.turtle.controller;

import cn.xilio.turtle.core.Result;
import cn.xilio.turtle.entity.dto.AccountLoginDTO;
import cn.xilio.turtle.entity.dto.CreateArticleDTO;
import cn.xilio.turtle.entity.dto.UpdateProfileDTO;
import cn.xilio.turtle.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Tag(name = "用户接口", description = "用户管理")
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;

    @PutMapping(value = "update-profile", name = "")
    public Mono<Result> updateProfile(@RequestBody @Validated UpdateProfileDTO dto) {
        String userId = "1";//todo userId
        return userService.updateProfile(userId, dto).then(Mono.just(Result.success()))
                .onErrorResume(ex -> Mono.just(Result.error("更新失败")));
    }

    @PostMapping(value = "login", name = "")
    public Mono<Result> accountLogin(@RequestBody @Validated AccountLoginDTO dto) {
        return userService.accountLogin(dto).map(Result::success);
    }
}
