
let attractionId = location.href.split("=")[1];
//console.log(attractionId);

let attractionItem;

//取得景點內容
axios.get(`${apiUrl}/attractions?id=${attractionId}`)
.then(res=>{
    //attractionItem = res.data.attractions[attractionId-1];
    attractionItem = res.data;
    //console.log(attractionItem);
    renderAttractionItem();
})
.catch(err=>{
    console.log(err.response);
})


//取得登入用戶的收藏資料
let collectionsData = [];

axios.get(`${apiUrl}/collections?_expand=attraction&&attractionId=${attractionId}&&userId=${localStorage.getItem("userId")}`)
.then(res=>{
    //attractionItem = res.data.attractions[attractionId-1];
    collectionsData = res.data[0];
    console.log(collectionsData);
    renderCollectionState();
})
.catch(err=>{
    console.log(err.response);
})



function renderAttractionItem(){
    const attractionIntro = document.querySelector('.attractionIntro');
    attractionIntro.textContent = JSON.stringify(attractionItem); 
}

const collectionBlock = document.querySelector('.collectionBlock');
const collectionState = document.querySelector('.collectionState');
const btnCollection = document.querySelector('.btnCollection');
const btnCollectCancel = document.querySelector('.btnCollectCancel');

function renderCollectionState(){
    
    //有登入才顯示收藏區塊
    console.log(localStorage.getItem("userId"));
    if(localStorage.getItem("userId") !== null){
        collectionBlock.setAttribute("class","col collectionBlock d-block")
    }

    //如果這個用戶有該項目收藏資料
    if(collectionsData !== undefined){
        if(collectionsData.userId == localStorage.getItem("userId")){
            collectionState.textContent = "已收藏";
            btnCollection.setAttribute("class","d-none");
        }else{
            btnCollectCancel.setAttribute("class","d-none");
        }
    }else{
        btnCollectCancel.setAttribute("class","d-none");
    }

    btnCollection.addEventListener('click',e=>{
        collectItem();
    })
    
    btnCollectCancel.addEventListener('click',e=>{
        calcelCollectItem();
    })
}



//收藏
function collectItem(){
    axios.post(`${apiUrl}/600/collections?userId=${localStorage.getItem("userId")}`,{
        "userId": localStorage.getItem("userId"),
        "attractionId": attractionId
    },headers)
    .then(res=>{
        console.log("成功收藏");
        // location.reload();
        collectionState.textContent = "已收藏";
        btnCollection.setAttribute("class","d-none");
        btnCollectCancel.setAttribute("class","btn btn-secondary btnCollectCancel d-inline-block");
        //renderCollectionState();
    })
    .catch(err=>{
        if (err?.response?.status === 401) {
            clearLocalStorage();
        }
        console.log(err.response);
    })
}

//取消收藏
function calcelCollectItem(){
    axios.delete(`${apiUrl}/600/collections/${collectionsData.id}`,headers)
    .then(res=>{
        //console.log(headers);
        console.log("成功取消");
        //location.reload();
        collectionState.textContent = "未收藏";
        btnCollection.setAttribute("class","btn btn-secondary btnCollection d-inline-block");
        btnCollectCancel.setAttribute("class","d-none");
        //renderCollectionState();
    })
    .catch(err=>{
        console.log(err.response);
    })
}