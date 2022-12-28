


const attractionTitle = document.querySelector('#attractionTitle');
const attractionContent = document.querySelector('#attractionContent');
const attractionImg = document.querySelector('#attractionImg');
const btnCreate = document.querySelector('.btnCreate');


btnCreate.addEventListener("click",e=>{
    if(attractionTitle.value!=="" && attractionContent.value !== "" && attractionImg.value !== ""){
        createAttraction();
    }else{
        alert('欄位請勿空白');
    }
})

// createAttraction();

function createAttraction(){
    axios.post(`${apiUrl}/600/attractions`,{
        "title":attractionTitle.value,
        "description": attractionContent.value,
        "imageUrl":attractionImg.value,
        "userId": localStorage.getItem("userId"),
    },headers)
    .then(res=>{
        alert('已成功新增');
        attractionTitle.value="";
        attractionContent.value="";
        attractionImg.value="";
        //console.log(res.data);
    }).catch(err=>{
        if (err?.response?.status === 401) {
            clearLocalStorage();
        }
        console.log(err.response); 
    })
}