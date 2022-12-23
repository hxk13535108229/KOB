package com.kob.backend.service.impl.user.account;

import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.account.InfoService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName InfoServiceImpl
 * @Description TODO
 * @Author OvO
 * @Date 2022-12-23 17:54
 * @Version 1.0
 **/
@Service
public class InfoServiceImpl implements InfoService {
    @Override
    public Map<String, String> getInfo() {
        UsernamePasswordAuthenticationToken authenticationToken=(UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl loginUser=(UserDetailsImpl) authenticationToken.getPrincipal();
        User user=loginUser.getUser();
        Map<String,String> map=new HashMap<>();
        map.put("error_massage", "success");
        map.put("id", user.getId().toString());
        map.put("username", user.getUsername());
        map.put("password",user.getPassword());
        map.put("photo", user.getPhoto());
        return map;
    }
}
