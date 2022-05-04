import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Font } from "../../components";
import {
  ActionsWrapper,
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

  const handleDelete = (e: any, id: number) => {
    e.preventDefault();
    const res = collections?.filter((item: any) => id !== item?.id);
    localStorage?.setItem("collections", JSON.stringify(res));
    setCollections(res);
  };

  const handleEdit = (e: any, id: number) => {
    e.preventDefault();
    console.log(id);
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
          <Card key={id} to={`/collections/detail?name=${item?.name}`}>
            <Container>
              {item?.list?.length !== 0 && item?.list[0]?.bannerImage && (
                <Image src={item?.list[0]?.bannerImage} alt="" width={"100%"} />
              )}
              <NameWrapper>
                <div>
                  <Font weight="semi-bold">{item?.name?.toUpperCase()}</Font>
                </div>
                <ActionsWrapper>
                  <div onClick={(e: any) => handleEdit(e, item?.id)}>edit</div>
                  <div onClick={(e: any) => handleDelete(e, item?.id)}>del</div>
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
