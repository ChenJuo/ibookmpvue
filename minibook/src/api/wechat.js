import { getOpenId } from "./index";

export function getSetting(auth,onSuccess,onFail){
  mpvue.getSetting({
    success(res) {
      if(res.authSetting[`scope.${auth}`]){
        onSuccess(res)
      }else{
        onFail(res)
      }
    },
    fail(res){
      console.log(res)//直接抛出异常
    }
  })
}

export function getUserInfo(onSuccess,onFail) {
  mpvue.getUserInfo({
    success(res){
      console.log(res);
      const {userInfo} =res;
      if(userInfo){
        onSuccess(userInfo)
      }else{
        onFail(res)
      }

    },
    fail(res){
      console.log(res)//直接抛出异常
    }
  })
}

export function setStorageSync(key,data) {
  mpvue.setStorageSync(key,data)
}

export function getStorageSync(key) {
  return mpvue.getStorageSync(key)
}

export function getUserOpenId() {
  mpvue.login({
    success(res){
      if(res.code){
        const {code} =res;
        getOpenId(code).then(res =>{
          const {data:{data:{openid}}} = res;
          setStorageSync('openId',openid)
          callback && callback(openid)
        }).catch(err =>{
          console.log(err)//直接抛出异常
        })
      }else{
        console.log(res)
      }
    },
    fail(res){
      console.log(res)//直接抛出异常
    }
  })
}

export function showLoading(title) {
  mpvue.showLoading({
    title,
    mask:true,
  })
}

export function hideLoading() {
  mpvue.hideLoading()
}

export function showToast(title) {
  mpvue.showToast({
    title,
    duration:2000
  })
}
