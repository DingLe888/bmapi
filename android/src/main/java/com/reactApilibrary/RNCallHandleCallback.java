package com.reactApilibrary;

import com.alibaba.fastjson.JSONObject;


public interface RNCallHandleCallback {
    void callHandle(String messageName, JSONObject jsonObject);
}
