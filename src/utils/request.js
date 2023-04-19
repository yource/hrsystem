import axios from "axios";

var baseURL = 'https://order.mealkeyway.com';
// 测试：本地环境
// baseURL = "http://192.168.0.77:3000";

var config = {
    timeout: 20000,
    withCredentials: false
};

var instance = axios.create(config);
 
instance.interceptors.request.use((config)=>{
    var userId = window.localStorage.getItem('userId');
    var token = window.localStorage.getItem('token');
    config.headers = config.headers || {};
	config.baseURL = baseURL;
    if (userId && token) {
       config.headers = Object.assign(config.headers, {
           Authorization: 'FSign user="' + userId + '",token="' + token + '"'
       });
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use((response)=>{
	if(!response) return Promise.reject();
	if(response.data && ((typeof response.data=="string" && response.data.toLowerCase().indexOf("cannot verify signature")>-1) || response.data=="Unauthorized" || response.data.status=="UNAUTHORIZED" || response.data.message=="Forbidden" || response.data.statusCode == 403 || response.status==403)){
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("refreshToken");
		Bus.emit("logout");
		return Promise.reject();
	}else if (response.status == 200 || (response.data.successful||response.data.Success)) {
	    return response.data;
	} else if (response.data && (response.data instanceof Array)) {
	    return response.data;
	} else {
	    if (response.data) {
			if(response.data.message){
				return Promise.reject(response.data.message)
			}else{
				return Promise.reject("Network Error");
			}
	    } else {
	        return Promise.reject("Network Error");
	    }
	}
}, (error)=>{
	//error.response.data
	return Promise.reject("Network Error. Please try again later.");
});

export function getAppVersion(){
    return instance({
        url: "/common/getAppVersion",
        method: "GET"
    })
}
