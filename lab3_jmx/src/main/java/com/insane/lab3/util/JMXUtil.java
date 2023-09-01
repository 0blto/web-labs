package com.insane.lab3.util;

import lombok.SneakyThrows;
import lombok.experimental.UtilityClass;

import javax.management.*;
import java.lang.management.ManagementFactory;
import java.util.HashMap;
import java.util.Map;

@UtilityClass
public class JMXUtil {
    private final Map<Class<?>, ObjectName> beans = new HashMap<>();

    @SneakyThrows
    public void registerBean(Object bean, String name) {
        ObjectName objName = new ObjectName(String.format("%s:type=%s,name=%s", bean.getClass().getPackageName(), bean.getClass().getSimpleName(), name));
        ManagementFactory.getPlatformMBeanServer().registerMBean(bean, objName);
        beans.put(bean.getClass(), objName);
    }

    @SneakyThrows
    public void unregisterBean(Object bean) {
        if (!beans.containsKey(bean.getClass())) {
            throw new IllegalArgumentException("Specified bean is not registered.");
        }
        ManagementFactory.getPlatformMBeanServer().unregisterMBean(beans.get(bean.getClass()));
        beans.remove(bean.getClass());
    }
}
