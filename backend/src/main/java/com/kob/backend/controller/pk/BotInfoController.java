package com.kob.backend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ClassName BotInfoController
 * @Description TODO
 * @Author OvO
 * @Date 2022-10-25 20:04
 * @Version 1.0
 **/
@RequestMapping("/pk/")
@RestController
public class BotInfoController {

    @RequestMapping("getBotInfo/")
    public String getBotInfo() {
        return "hhh";
    }
}
