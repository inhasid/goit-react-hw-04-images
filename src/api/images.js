import axios from "axios";

const instance = axios.create({
    baseURL: "https://pixabay.com/api",
    // params: {
    //     key: "",
    //     image_type: "photo",
    //     orientation: "horizontal"
    // }
})

export const getAllImages = ()=> {
    return instance.get("/?q=cat&page=1&key=40892694-b915ef9d6feb731a5d3c7d944&image_type=photo&orientation=horizontal&per_page=12");
}

export const searchImages = (q, page = 1) => {
   // return instance.get(`/?q=${q}&page=${page}&key=40892694-b915ef9d6feb731a5d3c7d944&image_type=photo&orientation=horizontal&per_page=12`)
    return instance.get("/", {
        params: {
            q,
            page,
            key: "40892694-b915ef9d6feb731a5d3c7d944",
            image_type: "photo",
            orientation: "horizontal",
            per_page: 12
        }
    })
}