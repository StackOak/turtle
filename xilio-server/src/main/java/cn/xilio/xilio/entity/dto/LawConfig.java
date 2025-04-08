package cn.xilio.xilio.entity.dto;


public record LawConfig(
        // 网站备案链接
        String icpLink,
        // 版权信息
        String copyright,
        // 网站备案号
        String icpNumber,
        // 公安备案信息
        String policeRecord,
        // 公安备案链接
        String policeRecordLink
) {

}
