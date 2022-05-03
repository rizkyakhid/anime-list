import { gql } from "@apollo/client";

export const queryGetAllAnime = gql`
query ($id: Int, $page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      lastPage
      hasNextPage
      perPage
    }
    media(id: $id) {
      id
      title {
        romaji
      }
      coverImage {
        medium
      }
      seasonYear
      episodes
    }
  }
}
`;