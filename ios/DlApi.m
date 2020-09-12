#import "DlApi.h"

@implementation DlApi  

static id<ApiCenterDelegate>  _delegate;

RCT_EXPORT_MODULE()


- (dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}

- (NSArray<NSString *> *)supportedEvents
{
  if (DlApi.apiDelegate) {
    __weak DlApi *dlapi = self;
    [DlApi.apiDelegate setRNCallHandle:^(NSString * messageName,NSDictionary *data) {
        [dlapi reactNativeCallHandle:messageName data:data];
      }];
  }
  return @[@"fromNativeToJsMessage"];
}



+(void)setApiDelegate:(id<ApiCenterDelegate>)apiDelegare{
  _delegate = apiDelegare;
}

+(id<ApiCenterDelegate>)apiDelegate{
  return _delegate;
}

/// 接收JS消息
/// @param param 参数
/// @param callback 回调
RCT_EXPORT_METHOD(callHandler:(NSDictionary *)param callback:(RCTResponseSenderBlock)callback)
{
  if (![param isKindOfClass:NSDictionary.class]) {
    callback(@[@{@"code":@"401",@"message":@"参数只能是JS对象"},[NSNull null]]);
    return;
  }
  
  if ([DlApi.apiDelegate respondsToSelector:@selector(handleRNMessage:success:failed:)]) {
    
    void (^successBlock)(NSDictionary * ) = ^(NSDictionary * result){
        callback(@[[NSNull null], result]);
    };
    
    void (^failedBlock)(NSDictionary * ) = ^(NSDictionary *  result){
        callback(@[result,[NSNull null]]);
    };
    
    [DlApi.apiDelegate handleRNMessage:param success:successBlock failed:failedBlock];
    
  }else{
    callback(@[@{@"code":@"400",@"message":@"您没有安排api中心来处理您的请求"},[NSNull null]]);
  }
}



/// 原生向JS发消息
/// @param data 消息体
- (void)reactNativeCallHandle:(NSString * )messageName data:(NSDictionary *)data
{
  NSMutableDictionary *finalData = [NSMutableDictionary dictionaryWithDictionary:data];
  [finalData setObject:messageName forKey:@"messageName"];
  
  [self sendEventWithName:@"fromNativeToJsMessage" body:finalData];
}




@end
