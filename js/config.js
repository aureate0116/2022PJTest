

const apiUrl = "https://json-server-vercel-forvuepjtest.onrender.com";
// const apiUrl = "./db.json";



const headers = {
    headers:{
        "authorization": `Bearer ${localStorage.getItem("token")}`        
    }
}