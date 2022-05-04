import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Font } from "../../components";
import { Container, SimpleTabWrapper, TabActive, TabInactive } from "./styles";

const CollectionsContainer = () => {
  const navigate = useNavigate();

  const handleClickAnimeList = () => {
    navigate("/");
    localStorage?.setItem(
      "history",
      JSON.stringify({
        page: 1,
        scrollY: 0,
      })
    );
  };

  const handleClickCollectionDetail = (name: string) => {
    navigate(`/collections/detail?name=${name}`);
  };

  const collections = localStorage?.collections
    ? JSON.parse(localStorage?.collections)
    : [];

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
        <TabInactive onClick={handleClickAnimeList}>Anime List</TabInactive>
        <TabActive>All collections</TabActive>
      </SimpleTabWrapper>
      {collections?.length !== 0 ? (
        collections?.map((item: any, id: number) => (
          <Card
            key={id}
            onClick={() => handleClickCollectionDetail(item?.name)}
          >
            <Font weight="semi-bold">{item?.name?.toUpperCase()}</Font>
          </Card>
        ))
      ) : (
        <div>BELUM ADA KOLEKSI</div>
      )}
    </Container>
  );
};

export default CollectionsContainer;
