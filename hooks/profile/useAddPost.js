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
      bankAccount: null,
      publishTime: data.publishTime,
    };

    return api.post("/post", body);
  };
}
