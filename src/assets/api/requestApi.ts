//api를 보내기전 오류를 공통으로 처리합니다.

import axios from "axios";


const instance = axios.create({
  baseURL: "http://172.31.163.68:3001",
});

// 인텀셉터를 활용하여 헤더에서 accessToken을 받아오거나 기능 사용시 헤더에 accessToken을 넣어 사용한다.
// instance.interceptors.request.use(function(config) {
//   const userInfo = sessionStorage.getItem("userAuthToken");
//   const accessToken = userInfo ? sessionStorage.getItem("userAuthToken") : null;
//   config.headers = { "X-AUTH-TOKEN": accessToken };
//   return config;
// });

// instance.interceptors.response.use(
//   function(config) {
//     // 요청 성공 직전 호출됩니다.
//     // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
//     localStorage.setItem("version", "v1.00");
//     console.log(sessionStorage.getItem("토큰가져옴"));
//     instance.headers = {
//       "X-AUTH-TOKEN": sessionStorage.getItem("userAuthToken"),
//     };
//     // this.$loading.hide();
//     return config;
//   },
//   function(error) {
//     //요청 에러 직전 호출됩니다.
//     if (error.response.status === 403) {
//       console.log("재로그인");
//       userController.auth().then((res) => {
//         alert("다시 시도해 보세요.");
//         //window.location = '/main';
//         //window.location.reload(true);
//         //window.location();
//         return res;
//       });
//     }

//   return Promise.reject(error);
// }
//);

export default instance;
