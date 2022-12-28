let usersData=[];

//取得用戶資料
axios.get(`${apiUrl}/users`)
.then(res=>{
    usersData = res.data;
})
.catch(err=>{
    console.log(err.response);
})

// axios.get(`${apiUrl}`)
// .then(res=>{
//     usersData = res.data.users;
// })
// .catch(err=>{
//     console.log(err.response);
// })


//取得欄位資料,監聽按鈕
const accountEmail = document.querySelector("#email");
const accountPassword = document.querySelector("#password");
const btnRegister = document.querySelector(".btnRegister");


btnRegister.addEventListener("click",e=>{
    //判斷填寫的資料是否已存在資料庫
    if(accountEmail.value !=="" &&  accountPassword.value !==""){
        usersData.forEach(user=>{
            if(user.email==accountEmail.value){
                alert("此信箱已註冊過，請換一個信箱");
                accountEmail.value="";
                accountPassword.value="";
            }
        })
    }
    
    register();
    
})    


//註冊
function register(){
    //console.log(accountEmail.value,accountPassword.value);
    axios.post(`${apiUrl}/users`,{
        "name": "", 
        "email":accountEmail.value,
        "password": accountPassword.value,
        "role":"user"
    })
    .then(res=>{
        accountEmail.value="";
        accountPassword.value="";
        alert("成功註冊");
        location.href="./login.html";
    })
    .catch(err=>{
        console.log(err.response);
    })

}