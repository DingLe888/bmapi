package com.reactApilibrary;


import com.alibaba.fastjson.JSONObject;

public interface ApiCallback {
    void successCallback(JSONObject jsonObject);

    void failedCallback(JSONObject jsonObject);
}
