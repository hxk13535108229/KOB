package com.kob.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kob.backend.pojo.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * @ClassName UserMapper
 * @Description TODO
 * @Author OvO
 * @Date 2022-12-22 16:46
 * @Version 1.0
 **/
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
