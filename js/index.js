
let attractionsData=[];

axios.get(`${apiUrl}/attractions`)
.then(res=>{
    attractionsData = res.data;
    //console.log(attractionsData);
    renderAttraction();
})
.catch(err=>{
    console.log(err.response);
})

// axios.get(`${apiUrl}`)
// .then(res=>{
//     attractionsData = res.data.attractions;
//     console.log(attractionsData);
//     renderAttraction();
// })
// .catch(err=>{
//     console.log(err.response);
// })


const attractionList = document.querySelector('.attractionList');

function renderAttraction(){
    let tempStr="";
    attractionsData.forEach(item=>{
        tempStr +=`
        <div class="col-4 my-3">
        <div class="card">
            <img src="${item.imageUrl}" class="card-img-top" alt="${item.title}">
            <div class="card-body">
                <h2 class="h4 card-title fw-bold">${item.title}</h2>
                <p class="card-text multiline-ellipsis">${item.description}</p>
                <a role="button" href="./attraction.html?id=${item.id}" data-id="${item.id}" class="btn btn-primary">繼續閱讀</a>
            </div>
        </div>
        </div>
        `;
    });

    attractionList.innerHTML = tempStr;
}