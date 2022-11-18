import http from "../common/http";

const uploadFile = (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);

  return http.post("/assignmentsheet", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const uploadFileWithData = (dataObject, file, objectType, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);
  formData.append(objectType, JSON.stringify(dataObject));

  return http.post("/forms/" + objectType, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const FileService = {
  uploadFile,
  uploadFileWithData,
};

export default FileService;
