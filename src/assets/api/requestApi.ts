//api를 보내기전 오류를 공통으로 처리합니다.
import axios from "axios";


const instance = axios.create({
  baseURL: "http://52.192.105.147:3001",
});

// 인텀셉터를 활용하여 헤더에서 accessToken을 받아오거나 기능 사용시 헤더에 accessToken을 넣어 사용한다.
instance.interceptors.request.use(async function (config) {
  const acToken = localStorage.getItem("act");
  config.headers = { ...config.headers, "x-access-token": acToken ? acToken : "has not accessToken" };


  // 요청 성공 직전 호출됩니다.
  const actExDate = String(localStorage.getItem("actExTime"));
  const aDateArr = actExDate.split(" ");

  const date = new Date(`${aDateArr[1]} ${aDateArr[2]} ${aDateArr[3]} ${aDateArr[4]}`);
  const nowDate = new Date();
  if (date <= nowDate) {
    const refreshToken = localStorage.getItem("reft");
    console.log("requestAPi: 토큰 만료");
    //access 토큰 받아옴
    await axios.request({
      headers: {
        ...config.headers,
        "x-refresh-token": refreshToken ? refreshToken : "has not refreshToken"
      },
      url: "http://52.192.105.147:3001/api/auth/refresh",

      method: "get"
    }).then((token) => {
      console.log("requstAPI: 토큰 변경 성공");
      localStorage.setItem("act", token.data.accessToken);
      const newAccessToken = token.data.accessToken;
      config.headers = {
        "x-access-token": newAccessToken
      };
      const exDate = new Date();
      exDate.setMinutes(exDate.getMinutes() + 15);
      localStorage.setItem("actExTime", String(exDate));
      return token;
    }).catch((error) => {
      //토큰에러시
      console.log("requstAPI: 토큰 변경 실패");
      const err = error.response.data.message;
      //요청 에러 직전 호출됩니다.
      if (err === "must be re login" || err === "최근 접근 토큰과 해당 토큰이 불일치") {
        localStorage.clear();
        alert("다시 로그인해주세요");
        location.replace("/");
        return Promise.reject(error);
      }
    });
  }
  return config;
});

instance.interceptors.response.use(
  function (config) {
    return config;
  }
);

export default instance;
