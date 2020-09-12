//
//  ApiChenter.h
//  JZPlus_RN
//
//  Created by 丁乐 on 2020/7/15.
//

#import <Foundation/Foundation.h>

@protocol ApiCenterDelegate <NSObject>


/// 处理webview 消息
/// @param data 消息体
/// @param successCallback 成功的回调
/// @param failedCallback 失败的回调
-(void)handleWebMessage:(NSDictionary *)data success:(void(^)(NSDictionary * ))successCallback failed:(void(^)(NSDictionary * ))failedCallback;


/// 处理RN消息
/// @param data 消息体
/// @param successCallback 成功的回调
/// @param failedCallback 失败的回调
-(void)handleRNMessage:(NSDictionary *)data success:(void(^)(NSDictionary * ))successCallback failed:(void(^)(NSDictionary * ))failedCallback;



/// 设置原生向webview发消息的句柄
/// @param callHandle 消息句柄
-(void)setWebviewCallHandle:(void(^)(NSString *messageName, NSDictionary * data,void(^successCallback)(NSDictionary * ),void(^failedCallback)(NSDictionary * )))callHandle;


/// 设置原生向RN发消息的句柄
/// @param callHandle 消息句柄
-(void)setRNCallHandle:(void(^)(NSString *messageName,NSDictionary *data))callHandle ;

@end





