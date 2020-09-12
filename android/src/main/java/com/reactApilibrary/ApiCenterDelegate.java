package com.reactApilibrary;

import com.facebook.react.bridge.ReadableMap;

import com.alibaba.fastjson.JSONObject;


public interface ApiCenterDelegate {

    void handleWebMessage(JSONObject jsonObject, ApiCallback callback);


    void setWebviewCallHandle(WebViewCallHandleCallback webviewCallHandle);

    void handleRNMessage(JSONObject jsonObject,  ApiCallback callback);

    void setRNCallHandle(RNCallHandleCallback rnCallHandle);

}
