let usersData=[];

//取得用戶資料
axios.get(`${apiUrl}/users`)
.then(res=>{
    usersData = res.data;
    console.log(usersData);
})
.catch(err=>{
    console.log(err.response);
})



//取得欄位資料&監聽
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const btnLogin = document.querySelector('.btnLogin');


btnLogin.addEventListener("click",e=>{
    //判斷填寫的資料是否已存在資料庫
    usersData.forEach(user=>{
        if(loginEmail.value !=="" &&  loginPassword.value !==""){
            if(user.email==loginEmail.value){
                login();
            }
        }
    })

})

function login(){
    axios.post(`${apiUrl}/login`,{
        "email":loginEmail.value,
        "password": loginPassword.value,
    })
    .then(res=>{
        localStorage.setItem('token',`${res.data.accessToken}`);
        localStorage.setItem('userId',`${res.data.user.id}`);
        location.href="./index.html";
    })
    .catch(err=>{
        alert('登入資料錯誤')
        console.log(err.response);
    })
    
}
