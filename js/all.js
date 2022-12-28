const beforeLogin = document.querySelector('.beforeLogin');
const afterLogin = document.querySelector('.afterLogin');
const linkToAdmin = document.querySelector('.linkToAdmin');


//取得用戶資料
let userList = [];

 //如果 timeout
 axios.get(`${apiUrl}/users/${localStorage.getItem("userId")}`,{},headers)
 .then(res=>{
     userList = res.data;
      console.log(userList);
     if (res.status === 401) {
         clearLocalStorage();
         changeHeader();
     }
     changeHeader();
 }).catch(err=>{

     if (err.response.status === 401) {
         clearLocalStorage();
         changeHeader();
     }
 })

function changeHeader(){
    //判斷登入登出切換 header
    if(localStorage.userId !==undefined){
        afterLogin.setAttribute("class","afterLogin navbar-nav mb-2 mb-lg-0 d-flex flex-row d-block");
        beforeLogin.setAttribute("class","d-none");

        const userId = localStorage.getItem("userId");
        const pageNow =location.href.split("/");
        //userList[`${userId-1}`]?.role==="admin"
        if(userList.role==="admin"){
            
            if(pageNow.includes("admin.html") || pageNow.includes("createAttratcion.html")){
                document.querySelector('#collectionLink').setAttribute("class","d-none");
                linkToAdmin.innerHTML=`<a href="./index.html">前往前台</a>`;
            }else{
                linkToAdmin.innerHTML=`<a href="./admin.html">前往後台</a>`;
            }
            
        }else{
            if(pageNow.includes("admin.html") || pageNow.includes("createAttratcion.html")){
                location.href="./index.html";
            }
        }

    }

}

//清除localStorage資訊
function clearLocalStorage(){
    localStorage.clear();
    location.href="./index.html";
}

//登出
const btnLogOut = document.querySelector('#btnLogOut');
if(btnLogOut!==null){
    btnLogOut.addEventListener('click',e=>{
        clearLocalStorage();
    })
}



