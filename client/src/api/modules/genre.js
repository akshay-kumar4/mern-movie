import publicClient from "../client/public";

const genreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
    getList: async ({mediaType}) => {
        try {
            const response = await publicClient.get(genreEndpoints.list)
        } catch (error) {
            
        }
    }
}