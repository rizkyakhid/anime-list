import { useQuery } from "@apollo/client";
import React from "react";
import { Card, Font } from "../../components";
import { queryGetAllAnime } from "./queries";
import {
  CardWrapper,
  Container,
  InfoWrapper,
  Pagination,
  PaginationDisabled,
  PaginationWrapper,
} from "./styles";

const HomeContainer = () => {
  const history = localStorage?.history
    ? JSON.parse(localStorage?.history)
    : undefined;
  const [pagination, setPagination] = React.useState({
    page: history?.page ? +history?.page : 1,
    perPage: 10,
  });

  React.useEffect(() => {
    if (history) {
      setPagination({ ...pagination, page: +history?.page });
      window.scrollTo(0, +history?.scrollY);
    }
  }, []);

  const handleHistory = (page: number, scrollY: number) => {
    localStorage?.setItem(
      "history",
      JSON.stringify({
        page,
        scrollY,
      })
    );
  };

  const handlePagination = async (click: "next" | "prev" | number) => {
    let page: number;
    if (click === "next") {
      page = pagination?.page + 1;
      await setPagination({ ...pagination, page });
    } else if (click === "prev") {
      page = pagination?.page - 1;
      await setPagination({ ...pagination, page });
    } else {
      page = click;
      await setPagination({ ...pagination, page: page });
    }
    window.scrollTo(0, 0);
    handleHistory(page, 0);
  };

  const handleClickCard = () => {
    handleHistory(pagination?.page, window?.scrollY);
  };

  const { data, loading } = useQuery(queryGetAllAnime, {
    variables: pagination,
  });

  return (
    <Container>
      <Font weight="semi-bold">Anime List</Font>
      {loading && <div>LOADING...</div>}
      {!loading && (
        <React.Fragment>
          {data?.Page?.media?.map((anime: any, id: number) => (
            <Card
              onClick={handleClickCard}
              key={id}
              to={`/detail?id=${anime?.id}`}
            >
              <CardWrapper>
                <img
                  height={139}
                  width={100}
                  src={anime?.coverImage?.medium}
                  alt=""
                />
                <InfoWrapper>
                  <Font weight="semi-bold">{anime?.title?.romaji}</Font>
                  <Font size="xs">
                    <span>{anime?.meanScore}</span> / 100
                  </Font>
                  <Font size="xs">{anime?.seasonYear}</Font>
                  <Font size="xs">{`${anime?.episodes} Episode${
                    anime?.episodes !== 1 ? "s" : ""
                  }`}</Font>
                </InfoWrapper>
              </CardWrapper>
            </Card>
          ))}
          <PaginationWrapper>
            {pagination?.page !== 1 && (
              <>
                <Pagination onClick={() => handlePagination("prev")}>
                  <Font size="xs">Prev</Font>
                </Pagination>
                <PaginationDisabled>
                  <Font size="xs" color="#828282">
                    ...
                  </Font>
                </PaginationDisabled>
              </>
            )}
            <Pagination onClick={() => handlePagination(pagination?.page)}>
              <Font size="xs" weight="bold">
                {String(pagination?.page)}
              </Font>
            </Pagination>
            <Pagination onClick={() => handlePagination(pagination?.page + 1)}>
              <Font size="xs">{String(pagination?.page + 1)}</Font>
            </Pagination>
            <PaginationDisabled>
              <Font size="xs" color="#828282">
                ...
              </Font>
            </PaginationDisabled>
            <Pagination onClick={() => handlePagination("next")}>
              <Font size="xs">Next</Font>
            </Pagination>
          </PaginationWrapper>
        </React.Fragment>
      )}
    </Container>
  );
};

export default HomeContainer;
