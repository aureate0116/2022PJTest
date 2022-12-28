const attractionList = document.querySelector('.attractionList');
let attractionsData=[];


function renderAttractionList(){
    axios.get(`${apiUrl}/attractions`)
    .then(res=>{
        attractionsData = res.data;
        console.log(attractionsData);
        let tempStr="";
        attractionsData.forEach(item=>{
            tempStr +=`
            <tr>
                <th scope="row">${item.id}</th>
                <td class="col-2">${item.title}</td>
                <td class="col-7">${item.description}</td>
                <td>
                    <button type="button" data-id="${item.id}" class="btnDelete btn btn-outline-danger mx-2">刪除</button>
                    <button type="button" data-id="${item.id}" class="btnEdit btn btn-warning mx-2">編輯</button>
                </td>
            </tr>
            `;
        })
        attractionList.innerHTML = tempStr;

        const btnsDelete = document.querySelectorAll('.btnDelete');
        const btnsEdit = document.querySelectorAll('.btnEdit');
        deleteAttraction(btnsDelete);
        editAttractionsPage(btnsEdit);
    })
    .catch(err=>{
        console.log(err.response);
    })

    

   
    
}

renderAttractionList();



//刪除
function deleteAttraction(btnsDelete){
    btnsDelete.forEach(btn=>{
        btn.addEventListener('click',e=>{
            const itemId = btn.getAttribute("data-id");
            //console.log(itemId);
            axios.delete(`${apiUrl}/attractions/${itemId}`,headers)
            .then(res=>{
                console.log(res);
                renderAttractionList();
                //location.reload();
            })
            .catch(err=>{
                console.log(err.response);
            })          
        })
    })
}


// 編輯
function editAttractionsPage(btnsEdit){
    btnsEdit.forEach(btn=>{
        btn.addEventListener('click',e=>{
            const itemId = btn.getAttribute("data-id");
            console.log(itemId);
            location.href=`./editAttraction.html?id=${itemId}`;
        })
    })
    
}

