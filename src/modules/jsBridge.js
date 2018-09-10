const bridge = {
    g_deviceType : function(){//识别设备系统
        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
            return "IOS";
        }else if(/(Android)/i.test(navigator.userAgent)){
            return "Android";
        }else if(/(Macintosh)/i.test(navigator.userAgent)){
            return "Macintosh";
        }else if(/(Windows)/i.test(navigator.userAgent)){
            return "Windows";
        }else{
            return "PC";
        }
    },
    getHost : function(){//获取网站路径
        if(bridge.g_deviceType() == "IOS" && typeof iOSgetHost == "function"){
            return iOSgetHost();
        }else if(bridge.g_deviceType() == "Android" && typeof Android == "object" && typeof Android.getHost == "function"){
            return Android.getHost();
        }
    },
    getToken : function(){//获取token
        if(bridge.g_deviceType() == "IOS" && typeof iOSgetToken == "function"){
			return iOSgetToken();
		}else if(bridge.g_deviceType() == "Android" && typeof Android == "object" && typeof Android.getToken == "function"){
			return Android.getToken();
		}
    }
}

module.exports = bridge;