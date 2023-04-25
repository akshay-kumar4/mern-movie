import get from "../axios/index.js";
import tmdbEndpoints from "./endpoints.js";

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await get(tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })),
  mediaDetail: async ({ mediaType, mediaId }) =>
    await get(tmdbEndpoints.mediaDetail({ mediaType, mediaId })),
  mediaGenres: async ({ mediaType }) =>
    await get(tmdbEndpoints.mediaGenres({ mediaType })),
  mediaCredits: async ({ mediaType, mediaId }) =>
    await get(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),
  mediaVideos: async ({ mediaType, mediaId }) =>
    await get(tmdbEndpoints.mediaVideos({ mediaType, mediaId })),
  mediaImages: async ({ mediaType, mediaId }) =>
    await get(tmdbEndpoints.mediaImages({ mediaType, mediaId })),
  mediaRecommend: async ({ mediaType, mediaId }) =>
    await get(tmdbEndpoints.mediaRecommend({ mediaType, mediaId })),
  mediaSearch: async ({ mediaType, query, page }) =>
    await get(tmdbEndpoints.mediaSearch({ mediaType, query, page })),
  personDetail: async ({ personId }) =>
    await get(tmdbEndpoints.personDetail({ personId })),
  personMedias: async ({ personId }) =>
    await get(tmdbEndpoints.personMedias({ personId })),
};

export default tmdbApi;
