package com.kob.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName RegisterServiceImpl
 * @Description TODO
 * @Author OvO
 * @Date 2022-12-23 17:54
 * @Version 1.0
 **/
@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> register(String username, String password, String confirmedPassword) {
        Map<String,String> map=new HashMap<>();
        if (username==null) {
            map.put("error_massage","用户名不能为空");
            return map;
        }
        if (password == null || confirmedPassword ==null) {
            map.put("error_massage","密码不能为空");
            return map;
        }

        username=username.trim();
        if (username.length() == 0) {
            map.put("error_massage","用户名不能为空");
            return map;
        }

        if (password.length() == 0 || confirmedPassword.length()==0) {
            map.put("error_massage","密码不能为空");
            return map;
        }

        if (username.length() > 100) {
            map.put("error_massage","用户名长度不能大于100");
            return map;
        }

        if(password.length()>100 || confirmedPassword.length()>100) {
            map.put("error_massage","密码长度不能大于100");
            return map;
        }

        if (!password.equals(confirmedPassword)) {
            map.put("error_massage","两次输入的密码不一致");
            return map;
        }

        QueryWrapper queryWrapper=new QueryWrapper();
        queryWrapper.eq("username", username);
        List<User> users = userMapper.selectList(queryWrapper);

        if (!users.isEmpty()) {
            map.put("error_massage","用户已存在");
            return map;
        }

        String encodedPassword=passwordEncoder.encode(password);
        String photo="https://cdn.acwing.com/media/user/profile/photo/219303_lg_4014842126.jpg";
        User user=new User(null,username,encodedPassword,photo);
        userMapper.insert(user);

        map.put("error_massage","success");


        return map;
    }
}
