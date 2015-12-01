/**
 * Created by schp-tany on 2015/12/1.
 */


(function(){
    function onWxBridgeReady(){
        console.log("微信库已经加载。。。")
        alert("已加载。。。")
    };
    document.addEventListener("WeixinJSBridgeReady",onWxBridgeReady,false);

}())