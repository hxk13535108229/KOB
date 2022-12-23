package com.kob.backend.controller.user.account;

import com.kob.backend.service.user.account.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @ClassName InfoController
 * @Description TODO
 * @Author OvO
 * @Date 2022-12-23 18:11
 * @Version 1.0
 **/
@RestController
public class InfoController {

    @Autowired
    private InfoService infoService;

    @GetMapping("/user/account/info/")
    public Map<String,String> getInfo() {
        return infoService.getInfo();
    }
}
