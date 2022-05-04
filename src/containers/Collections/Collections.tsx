import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Font } from "../../components";
import {
  ActionsWrapper,
  ClickableDiv,
  Container,
  Image,
  NameWrapper,
  SimpleTabWrapper,
  TabActive,
  TabInactive,
} from "./styles";

const CollectionsContainer = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState(
    localStorage?.collections
      ? JSON.parse(localStorage?.collections)
      : ([] as any[])
  );

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

  const handleDelete = (id: number) => {
    const res = collections?.filter((item: any) => id !== item?.id);
    localStorage?.setItem("collections", JSON.stringify(res));
    setCollections(res);
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
        <TabInactive onClick={handleClickAnimeList}>Anime List</TabInactive>
        <TabActive>All collections</TabActive>
      </SimpleTabWrapper>
      <Button>Add Collection</Button>
      {collections?.length !== 0 ? (
        collections?.map((item: any, id: number) => (
          <Card key={id}>
            <Container>
              {item?.list?.length !== 0 && item?.list[0]?.bannerImage && (
                <Image
                  onClick={() => handleClickCollectionDetail(item?.name)}
                  src={item?.list[0]?.bannerImage}
                  alt=""
                  width={"100%"}
                />
              )}
              <NameWrapper>
                <ClickableDiv
                  onClick={() => handleClickCollectionDetail(item?.name)}
                >
                  <Font weight="semi-bold">{item?.name?.toUpperCase()}</Font>
                </ClickableDiv>
                <ActionsWrapper>
                  <ClickableDiv>edit</ClickableDiv>
                  <ClickableDiv onClick={() => handleDelete(item?.id)}>
                    del
                  </ClickableDiv>
                </ActionsWrapper>
              </NameWrapper>
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
