import { useQuery } from "@apollo/client";
import React from "react";
import { Card, Font } from "../../components";
import { queryGetAllAnime } from "./queries";
import {
  CardWrapper,
  Container,
  InfoWrapper,
  PaginationWrapper,
} from "./styles";

const HomeContainer = () => {
  const [pagination, setPagination] = React.useState({
    page: 1,
    perPage: 10,
  });

  const handlePagination = () => {
    setPagination({ ...pagination, page: pagination?.page + 1 });
  };

  const { data, loading } = useQuery(queryGetAllAnime, {
    variables: pagination,
  });

  return (
    <Container onClick={handlePagination}>
      <Font weight="semi-bold">Anime List</Font>
      {!loading && (
        <React.Fragment>
          {data?.Page?.media?.map((anime: any, id: number) => (
            <Card key={id} to={`/detail?id=${anime?.id}`}>
              <CardWrapper>
                <img src={anime?.coverImage?.medium} alt="" />
                <InfoWrapper>
                  <Font weight="semi-bold">{anime?.title?.romaji}</Font>
                  <Font size="xs">{anime?.seasonYear}</Font>
                  <Font size="xs">{`${anime?.episodes} Episode${
                    anime?.episodes !== 1 ? "s" : ""
                  }`}</Font>
                </InfoWrapper>
              </CardWrapper>
            </Card>
          ))}
          <PaginationWrapper>
            <div>Prev</div>
            <div>1</div>
            <div>2</div>
            <div>...</div>
            <div>Next</div>
          </PaginationWrapper>
        </React.Fragment>
      )}
    </Container>
  );
};

export default HomeContainer;
