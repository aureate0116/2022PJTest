//https://bobby.tw/blog/post/231978373-%E3%80%90%E5%B7%B4%E9%BB%8E%E6%99%AF%E9%BB%9E%E5%9C%B0%E5%9C%96%E6%8E%A8%E8%96%A6%E3%80%91%E5%B7%B4%E9%BB%8E%E8%87%AA%E7%94%B1%E8%A1%8C%E5%BF%85%E5%8E%BB%E6%97%85%E9%81%8A%E6%99%AF

const apiUrl = "https://json-server-vercel-forvuepjtest.onrender.com";


// const localStorageId = localStorage.getItem("userId");

const headers = {
    headers:{
        "authorization": `Bearer ${localStorage.getItem("token")}` 
    }
}