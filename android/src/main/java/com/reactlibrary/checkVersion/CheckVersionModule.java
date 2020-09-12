package com.reactlibrary.checkVersion;


import com.allenliu.versionchecklib.v2.AllenVersionChecker;
import com.allenliu.versionchecklib.v2.builder.UIData;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


import javax.annotation.Nonnull;

import androidx.annotation.NonNull;

public class CheckVersionModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;



    public CheckVersionModule(@Nonnull ReactApplicationContext context){
        super(context);
        reactContext = context;

    }

    @NonNull
    @Override
    public String getName() {
        return "CheckVersionModule";
    }



    /*
    * 升级apk
    *
    * apkUrl:apk下载地址
    * versionCode：apk的build号
    * */
    @ReactMethod
    public void updateApk( String apkUrl,int versionCode) {

        AllenVersionChecker.getInstance().downloadOnly(
                UIData.create().setDownloadUrl(apkUrl)
        ).setDirectDownload(true)
        .setShowNotification(true)
        .setShowDownloadFailDialog(true).setNewestVersionCode(versionCode).executeMission(reactContext);

    }


}
