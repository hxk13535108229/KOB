package com.kob.backend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

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
    public Map<String,String> getBotInfo() {
        HashMap<String, String> bot1 = new HashMap<>();
        bot1.put("name", "tiger");
        bot1.put("ranking", "1500");
        return bot1;
    }
}
