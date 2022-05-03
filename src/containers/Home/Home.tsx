import { useQuery } from "@apollo/client";
import React from "react";
import { Card, Font } from "../../components";
import { queryGetAllAnime } from "./queries";
import { CardWrapper, Container, InfoWrapper } from "./styles";

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
      {!loading && (
        <React.Fragment>
          <Font weight="semi-bold">Anime List</Font>
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
        </React.Fragment>
      )}
    </Container>
  );
};

export default HomeContainer;
