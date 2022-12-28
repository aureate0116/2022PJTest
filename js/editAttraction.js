const attractionId = location.href.split("=")[1];
console.log(attractionId);

const attractionTitle = document.querySelector('#attractionTitle');
const attractionContent = document.querySelector('#attractionContent');
const attractionImg = document.querySelector('#attractionImg');
const btnUpdate = document.querySelector('.btnUpdate');


//取得資料
let itemData=[];

axios.get(`${apiUrl}/attractions/${attractionId}`)
.then(res=>{
    itemData = res.data;
    renderItem();
})
.catch(err=>{
    console.log(err.response);
})

function renderItem(){
    attractionTitle.value = itemData.title;
    attractionContent.value = itemData.description;
    attractionImg.value = itemData.imageUrl;
}

//修改
btnUpdate.addEventListener('click',e=>{
    if(attractionTitle.value!=="" && attractionContent.value !== "" && attractionImg.value !== ""){
        editAttraction();
    }else{
        alert('欄位請勿空白');
    }

})


function editAttraction(){
    axios.patch(`${apiUrl}/attractions/${attractionId}`,{
        "title":attractionTitle.value,
        "description": attractionContent.value,
        "imageUrl":attractionImg.value,
        "userId": localStorage.getItem("userId"),
    },headers)
    .then(res=>{
        alert('已成功修改');
        //console.log(res.data);
    }).catch(err=>{
        if (err?.response?.status === 401) {
            clearLocalStorage();
        }
        console.log(err.response); 
    })
}