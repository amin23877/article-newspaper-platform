import { api } from "axios/api";

export function useAddPost() {
  return (data) => {
    let body = {
      contentType: data.contentType.name,
      title: data.title,
      description: data.description,
      tags: data.subjects,
      files: [data.fileId],
      coverImage: data.coverFileId,
      paymentType: [data.sharePolicy],
      price: data.price,
      publishTime: data.publishTime || new Date(Date.now()).toISOString(),
    };
    return api.post("/post", body);
  };
}
