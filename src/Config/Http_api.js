import axios from 'axios'

const http = axios.create({
    baseURL:'http://localhost:5500',
    headers:{
        'Content-Type': 'application.json',
    },
});

const httpFile = axios.create({
    baseURL: "http://localhost:5500",
    headers: {
      "Content-Type": "multipart/form-data",
      token: localStorage.getItem("token") || "",
    },
  });
  export { http, httpFile };


