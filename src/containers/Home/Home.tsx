import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CardAnimeList, Pagination } from "../../fragments";
import { queryGetAllAnime } from "./queries";
import { Container, SimpleTabWrapper, TabActive, TabInactive } from "./styles";

const HomeContainer = () => {
  const history = localStorage?.history
    ? JSON.parse(localStorage?.history)
    : undefined;
  const [pagination, setPagination] = React.useState({
    page: history?.page ? +history?.page : 1,
    perPage: 10,
  });
  const { data, loading } = useQuery(queryGetAllAnime, {
    variables: pagination,
  });
  const navigate = useNavigate();

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

  const handleClickCollection = () => {
    navigate("/collections");
  };

  if (!localStorage?.collections) {
    localStorage?.setItem(
      "collections",
      JSON.stringify([
        { id: 1, name: "favorites", list: [] },
        { id: 2, name: "to be watched", list: [] },
      ])
    );
  }

  return (
    <Container>
      <SimpleTabWrapper>
        <TabActive>Anime List</TabActive>
        <TabInactive onClick={handleClickCollection}>
          All collections
        </TabInactive>
      </SimpleTabWrapper>
      {loading && <div>LOADING...</div>}
      {!loading && (
        <React.Fragment>
          {data?.Page?.media?.map((anime: any, id: number) => (
            <CardAnimeList data={anime} key={id} onClick={handleClickCard} />
          ))}
          <Pagination value={pagination?.page} onClick={handlePagination} />
        </React.Fragment>
      )}
    </Container>
  );
};

export default HomeContainer;
