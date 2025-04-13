//package cn.xilio.turtle.config;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.stereotype.Component;
//
//import cn.dev33.satoken.stp.StpInterface;
//
///**
// * 自定义权限验证接口扩展
// */
//@Component
//public class StpInterfaceImpl implements StpInterface {
//
//    /**
//     * 返回一个账号所拥有的权限码集合
//     */
//    @Override
//    public List<String> getPermissionList(Object loginId, String loginType) {
//        List<String> list = new ArrayList<String>();
//        list.add("article:save");
//        list.add("article:delete");
//        return list;
//    }
//
//    /**
//     * 返回一个账号所拥有的角色标识集合
//     */
//    @Override
//    public List<String> getRoleList(Object loginId, String loginType) {
//        return List.of("admin");
//    }
//
//}
