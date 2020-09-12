package com.reactApilibrary;

import com.alibaba.fastjson.JSONObject;

public interface WebViewCallHandleCallback {

    void callHandle(String messageName, JSONObject jsonObject, ApiCallback apiCallback);
}
