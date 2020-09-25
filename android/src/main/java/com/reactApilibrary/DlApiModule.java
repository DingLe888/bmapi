package com.reactApilibrary;

import android.content.Intent;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class DlApiModule extends ReactContextBaseJavaModule {
    static public ApiCenterDelegate delegate;

    private static ReactApplicationContext reactContext;
    public static DlApiModule instance;

    public DlApiModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        instance = this;

        if (delegate != null) {
            delegate.setRNCallHandle(new RNCallHandleCallback() {
                @Override
                public void callHandle(String messageName, JSONObject jsonObject) {
                    reactNativeCallHandle(messageName, jsonObject);
                }
            });
        }
    }


    @NonNull
    @Override
    public String getName() {
        return "DlApi";
    }


    @ReactMethod
    public void callHandler(ReadableMap param, final Callback callback) {
        if (delegate == null) {
            WritableNativeMap map = new WritableNativeMap();
            map.putString("code", "400");
            map.putString("state", "您没有安排api中心来处理您的请求");
            callback.invoke(map);
        } else {
            String jsonString = JSON.toJSONString(param.toHashMap());

            delegate.handleRNMessage(JSON.parseObject(jsonString), new ApiCallback() {
                @Override
                public void successCallback(JSONObject jsonObject) {
                    callback.invoke(null, DlApiModule.jsonToMap(jsonObject));
                }

                @Override
                public void failedCallback(JSONObject jsonObject) {
                    callback.invoke(DlApiModule.jsonToMap(jsonObject));
                }
            });
        }
    }

    private void reactNativeCallHandle(String messageName, JSONObject jsonObject) {

        jsonObject.put("messageName", messageName);
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("fromNativeToJsMessage", DlApiModule.jsonToMap(jsonObject));
    }


    private static WritableMap jsonToMap(JSONObject jsonObject) {

        WritableNativeMap map = new WritableNativeMap();

        for (Map.Entry<String, Object> entry : jsonObject.entrySet()) {
            Object value = entry.getValue();
            String key = entry.getKey();

            if (value instanceof String) {
                map.putString(key, (String) value);
            }else if (value instanceof Boolean) {
                map.putBoolean(key, (Boolean) value);
            }else if (value instanceof Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof BigDecimal){
                BigDecimal bigDecimal = (BigDecimal)value;
                map.putDouble(key,bigDecimal.doubleValue());
            }else if (value instanceof Integer) {
                map.putInt(key, (Integer) value);
            }else if (value instanceof JSONObject) {
                WritableMap data = DlApiModule.jsonToMap((JSONObject)value);
                map.putMap(key,data);
            }else if(value instanceof JSONArray){
                JSONArray arr = (JSONArray) value;
                WritableArray wArr = new WritableNativeArray();
                for (int i = 0; i < arr.size(); i++) {
                    Object item = arr.get(i);
                    if (item instanceof WritableMap){
                        wArr.pushMap((WritableMap)item);
                    }else if (item instanceof WritableArray){
                        wArr.pushArray((WritableArray)item);
                    }else if(item instanceof String){
                        wArr.pushString((String) item);
                    }else if(item instanceof Integer){
                        wArr.pushInt((Integer) item);
                    }else if(item instanceof Double){
                        wArr.pushDouble((Double) item);
                    }else if(item instanceof Boolean){
                        wArr.pushBoolean((Boolean) item);
                    }else  {
                        WritableMap data = DlApiModule.jsonToMap((JSONObject) item);
                        wArr.pushMap(data);
                    }
                }
                map.putArray(key,wArr);
            }else if(value instanceof WritableNativeMap){
                map.putMap(key,(WritableNativeMap)value);
            }else if(value instanceof  WritableNativeArray){
                map.putArray(key,(WritableNativeArray)value);
            }
        }

        return map;
    }

}
