

//取得用戶所有收藏

let userCollectData = [];

axios.get(`${apiUrl}/collections?_expand=attraction&&userId=${localStorage.getItem("userId")}`)
.then(res=>{
    //attractionItem = res.data.attractions[attractionId-1];
    userCollectData = res.data;
    console.log(userCollectData);
    renderMyCollection();
})
.catch(err=>{
    console.log(err.response);
})


const myCollectionList = document.querySelector('.myCollectionList');

function renderMyCollection(){
    let tempStr="";
    userCollectData.forEach(item=>{
        tempStr +=`
        <div class="col">
        <div class="card">
            <img src="${item.attraction.imageUrl}" class="card-img-top" alt="${item.attraction.title}">
            <div class="card-body">
                <h2 class="h4 card-title fw-bold">${item.attraction.title}</h2>
                <p class="card-text multiline-ellipsis">${item.attraction.description}</p>
                <a role="button" href="./attraction.html?id=${item.attraction.id}" data-id="${item.attraction.id}" class="btn btn-primary">繼續閱讀</a>
            </div>
        </div>
        </div>
        `;
    })

    myCollectionList.innerHTML=tempStr;
}