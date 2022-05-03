import { gql } from "@apollo/client";

export const queryGetDetailById = gql`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        native
      }
      bannerImage
      status
      duration
      seasonYear
      episodes
      description
    }
  }
`;
