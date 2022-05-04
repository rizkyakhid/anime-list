import { useQuery } from "@apollo/client";
import React from "react";
import { Font } from "../../components";
import { CardAnimeList, Pagination } from "../../fragments";
import { queryGetAllAnime } from "./queries";
import { Container } from "./styles";

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

  if (!localStorage?.collections) {
    localStorage?.setItem(
      "collections",
      JSON.stringify([{ name: "favorites", list: [] }])
    );
  }

  return (
    <Container>
      <Font weight="semi-bold">Anime List</Font>
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
