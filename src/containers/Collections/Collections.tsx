import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Font } from "../../components";
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
      <Button>Add Collection</Button>
      {collections?.length !== 0 ? (
        collections?.map((item: any, id: number) => (
          <Card
            key={id}
            onClick={() => handleClickCollectionDetail(item?.name)}
          >
            <Container>
              {item?.list?.length !== 0 && (
                <img
                  src={item?.list[0]?.bannerImage}
                  alt="Banner Image"
                  width={"100%"}
                />
              )}
              <Font weight="semi-bold">{item?.name?.toUpperCase()}</Font>
            </Container>
          </Card>
        ))
      ) : (
        <div>BELUM ADA KOLEKSI</div>
      )}
    </Container>
  );
};

export default CollectionsContainer;
