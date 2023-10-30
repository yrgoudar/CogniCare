import request from "./request";
const uuid = require("uuid").v4;

const gateway = {
  addUser(params) {
    return request("/faces/index", "post", {
      image: params.image,
      fullName: params.fullName,
    });
  },

  processImage(image) {
    const id = uuid();
    return request("/process", "post", { 
      image: image,
      displayImageTag: "dog",
      sessionId: id });
  },
};

export default gateway;
