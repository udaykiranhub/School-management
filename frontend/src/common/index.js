const backapi = "http://localhost:3490";

const Allapi = {
  login: {
    url: `${backapi}/api/signin`,
    method: "Post",
  },
  admin: {
    url: `${backapi}/api/addadmin`,
    method: "Post",
  },
  
  createBranch:{
    url:`${backapi}/api/branch/create-branch`,
    method:"Post"
  },
  getBranches:{
    url:`${backapi}/api/branch/get-branches`,
    method:"Get"
  }
};
export default Allapi;
