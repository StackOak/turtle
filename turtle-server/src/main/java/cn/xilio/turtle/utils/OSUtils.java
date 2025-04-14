package cn.xilio.turtle.utils;

import java.util.Locale;

 /**
  * @Project Turtle
  * @Description 操作系统检测工具
  * @Author xilio
  * @Website https://xilio.cn
  * @Copyright (c) 2025 xilio. All Rights Reserved.
  */
public class OSUtils {

    private static final String OS = System.getProperty("os.name").toLowerCase(Locale.ENGLISH);

    public static boolean isWindows() {
        return OS.contains("win");
    }

    public static boolean isMac() {
        return OS.contains("mac") || OS.contains("darwin");
    }

    public static boolean isLinux() {
        return OS.contains("linux") && !isAndroid();
    }

    public static boolean isAndroid() {
        return OS.contains("android");
    }

    public static boolean isUnixLike() {
        return isLinux() || isMac() ||
                OS.contains("nix") || OS.contains("nux") || OS.contains("aix");
    }
    public static OSType getOSType() {
        if (isWindows()) {
            return OSType.WINDOWS;
        } else if (isMac()) {
            return OSType.MACOS;
        } else if (isLinux()) {
            return OSType.LINUX;
        } else if (isAndroid()) {
            return OSType.ANDROID;
        } else {
            return OSType.OTHER;
        }
    }


    public enum OSType {
        WINDOWS, MACOS, LINUX, ANDROID, OTHER
    }


    public static void printOSInfo() {
        System.out.println("OS Name: " + System.getProperty("os.name"));
        System.out.println("OS Arch: " + System.getProperty("os.arch"));
        System.out.println("OS Version: " + System.getProperty("os.version"));
        System.out.println("Detected OS: " + getOSType());
    }
}
