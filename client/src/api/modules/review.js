import privateClient from "../client/private";

const reviewEndpoints = {
  list: "reviwes",
  add: "reviews",
  remove: ({ reviewId }) => `review/${reviewId}`,
};

const reviewApi = {
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }) => {
    try {
      const response = await privateClient.post(reviewEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
      });
      return response;
    } catch (error) {
      return { error };
    }
  },
  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.delete(
        reviewEndpoints.remove({ reviewId })
      );
      return response;
    } catch (error) {
      return { error };
    }
  },
  getList: async () => {
    try {
      const response = await privateClient.get(reviewEndpoints.list);
      return response;
    } catch (error) {
      return { error };
    }
  },
};

export default reviewApi;
