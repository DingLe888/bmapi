#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "ApiCenterDelegate.h"


@interface DlApi : RCTEventEmitter<RCTBridgeModule>

@property(nonatomic,weak,class) id<ApiCenterDelegate> apiDelegate;

@end
