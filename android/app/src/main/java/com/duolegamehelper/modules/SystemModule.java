package com.duolegamehelper.modules;

import android.content.Context;
import android.content.res.Resources;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class SystemModule extends ReactContextBaseJavaModule {
    public SystemModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SystemModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("APP_PACKAGE_NAME", getReactApplicationContext().getPackageName());

        try {
            Context context = getReactApplicationContext();
            int resId = context.getResources().getIdentifier("build_config_package", "string", context.getPackageName());
            String className;
            constants.put("BUILD_CONFIG_PACKAGE_ID", resId);
            try {
                className = context.getString(resId);
                constants.put("CLASS_NAME", className);
            } catch (Resources.NotFoundException e) {
                className = getReactApplicationContext().getApplicationContext().getPackageName();
                constants.put("CLASS_NAME", className);
            }
            Log.i("className", className);
            Class clazz = Class.forName(className + ".BuildConfig");
            Field[] fields = clazz.getDeclaredFields();
            for (Field f : fields) {
                try {
                    constants.put(f.getName(), f.get(null));
                } catch (IllegalAccessException e) {
                    Log.d("ReactNative", "ReactConfig: Could not access BuildConfig field " + f.getName());
                }
            }
        } catch (ClassNotFoundException e) {
            Log.d("ReactNative", "ReactConfig: Could not find BuildConfig class");
        }
        return constants;
    }
}
