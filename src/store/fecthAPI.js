import { defineStore } from "pinia";
import axios from "axios";
// let url = "http://localhost:8080/api";
let url = "https://project-go-evsc.onrender.com/api";
const token = localStorage.getItem("Token");

export const useFecthStore = defineStore("Contact", {
  state: () => ({
    status: null,
    errorMessage: null,
  }),
  actions: {
    async postContact(contact = {}) {
      try {
        // console.log(contact);
        const response = await axios.post(
          `${url}/contact/create-contact`,
          contact,
          {
            headers: { "Content-Type": "application/json " },
          }
        );

        this.status = response.data.success;
      } catch (error) {
        // console.log(error);
        this.status = error.response.data.success;
        this.errorMessage = error.response.data.message;
      }
    },
  },
});

export const useAboutStore = defineStore("About", {
  state: () => ({
    database: [],
  }),
  actions: {
    async getAbout() {
      try {
        const response = await axios.get(`${url}/about/get-about`, {
          headers: { "Content-Type": "application/json " },
        });
        this.database = response.data.message;
        // console.log(this.database);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export const useCategoriStore = defineStore("Categori", {
  state: () => ({
    database: [],
    dataCategory: [],
  }),
  actions: {
    async getCategori(titleCategori, page, limit) {
      console.log(titleCategori);
      try {
        const response = await axios.get(
          `${url}/blog/subpage-blog?page=${page}&limit=${limit}&categori=${titleCategori}`
          // titleCategori
        );
        this.database = response.data.message.results;
        console.log(this.database);
      } catch (error) {
        console.log(error);
      }
    },

    async getAllCategory() {
      try {
        const response = await axios.get(`${url}/categori/get-categori`);
        this.dataCategory = response.data.message;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const userDetailsStore = defineStore("Details", {
  state: () => ({
    database: [],
    dataComent: [],
    message: null,
    status: null,
  }),
  actions: {
    async getDetailBlog(id) {
      // console.log("detai :" + id);
      try {
        const response = await axios.get(`${url}/blog/get-datail/${id}`, {
          headers: { "Content-Type": "application/json " },
        });
        this.database = response.data.message;
        // console.log( this.database);
      } catch (error) {
        console.log(error);
      }
    },

    async postComents(comment = {}) {
      console.log("Frontend" + comment.value);
      try {
        const response = await axios.post(
          `${url}/comment/create-comment`,
          comment,
          { headers: { "Content-Type": "application/json" } }
        );
        // console.log(response.data.message);
        this.status = response.data.success;
        // console.log("fetched" + this.status);
      } catch (error) {
        this.status = error.response.data.success;
        this.message = error.response.data.message;
        // console.log("fetched" + this.status);
      }
    },

    async findComments(id) {
      try {
        const response = await axios.get(`${url}/comment/get-comment/${id}`, {
          headers: { "Content-Type": "application/json" },
        });
        // console.log("getComents : ", response);
        this.dataComent = response.data.message;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const useBlogStore = defineStore("Blog", {
  state: () => ({
    blogdata: [],
    pagedata: [],
    status: false,
    message: "",
  }),
  actions: {
    async createBlog(blog = {}) {
      try {
        const response = await axios.post(`${url}/blog/create-blog`, blog, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.status = response.data.success;
      } catch (error) {
        this.status = error.response.data.success;
        this.message = error.response.data.message;
      }
    },

    async getBlog() {
      try {
        const response = await axios.get(`${url}/blog/all-blog`, {
          headers: { "Content-Type": "application/json" },
        });
        // console.log("blog : " + response.data.message);
        this.blogdata = response.data.message;
        // console.log("blog : " + this.blogdata);
      } catch (error) { }
    },

    // async getPageBlog(page, limit) {
    //   try {
    //     const response = await axios.get(
    //       `${url}/blog/page-blog?page=${page}&limit=${limit}`
    //     );
    //     // console.log("Ok ok ok: ", response);
    //     this.pagedata = response.data.message.results;
    //     // console.log(this.pagedata);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    async updateBlog(dataBlog = {}) {
      console.log(dataBlog);
      try {
        const response = await axios.put(`${url}/blog/update-blog`, dataBlog, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.status = response?.data.success;
        this.message = response?.data.message;
      } catch (error) {
        this.status = error.response?.data.success;
        this.message = error.response?.data.message;
      }
    },

    async deleteBlog(idBlog = {}) {
      try {
        const response = await axios.delete(
          `${url}/blog/delete-blog/${idBlog}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.status);
        this.status = response.data.success;
      } catch (error) {
        // console.log(error);
        this.status = error.response.data.success;
      }
    },
  },
});

export const useSingUpStore = defineStore("SingUp", {
  state: () => ({
    userData: [],
    statusLogin: false,
    statusRegister: false,
    messagStatus: "",
    author: null,
    dataAdminPost: [],
    pagedata: [],
  }),
  actions: {
    async loginAdmin(login) {
      try {
        const response = await axios.post(`${url}/admin/login`, login, {
          headers: { "Content-Type": "application/json" },
        });
        if (!response.data) throw new Error("Error API Login");
        localStorage.setItem("Token", response.data.message.accessToken);
        if (localStorage.getItem("Token")) {
          this.statusLogin = true;
        }

        console.log("success : " + response.accessToken);
        this.dataSingUp = response.data.message;
      } catch (error) {
        // this.messagStatus = error.response.data.message;
        this.statusLogin = error.response.data.success;
        // console.log("error : " + this.messagStatus);
      }
    },
    async registerAdmin(register) {
      try {
        const response = await axios.post(`${url}/admin/register`, register, {
          headers: { "Content-Type": "application/json" },
        });
        this.statusRegister = response.data.success;
      } catch (error) {
        this.messagStatus = error.response.data.message;
      }
    },

    async adminGetAuthor() {
      try {
        const response = await axios.get(`${url}/admin/get-admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.author = response.data.message;
        // console.log("author :", this.author);
      } catch (error) {
        console.log("Error get Author :", error);
      }
    },

    async adminGetAllPost() {
      try {
        // console.log(" ok ok ok ", nameAuthor);
        const response = await axios.get(`${url}/admin/get-allPost`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.dataAdminPost = response.data.message;
        console.log("allAdmiPost: ", this.dataAdminPost);
      } catch (error) {
        console.log("Error allAdmiPost: ", error);
      }
    },

    async adminPagePost(page, limit) {
      try {
        const response = await axios.get(
          `${url}/admin/get-pagination?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("Ok ok ok: ", response.data.message);
        this.pagedata = response.data.message.results;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
