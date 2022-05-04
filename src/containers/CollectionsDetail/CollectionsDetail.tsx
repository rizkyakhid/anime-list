import React, { useState } from "react";
import { Font } from "../../components";
import { CardAnimeList } from "../../fragments";
import { Container } from "./styles";

interface ICollectionsDetailContainer {
  name: string;
}

const CollectionsDetailContainer = ({ name }: ICollectionsDetailContainer) => {
  const collections = localStorage?.collections
    ? JSON.parse(localStorage?.collections)
    : [];
  const [current, setCurrent] = useState(
    collections?.length !== 0
      ? collections?.find(
          (item: any) =>
            item?.name?.toLowerCase() === name?.replace(/%20/g, " ")
        )
      : []
  );

  const handleDeleteAnime = (id: number) => {
    let curr = {} as any;
    const res = current?.list?.filter((item: any) => item?.id !== id);
    const coll = collections?.map((item: any) => {
      let result = {} as any;
      if (item?.name?.toLowerCase() === name?.replace(/%20/g, " ")) {
        result = {
          id: item?.id,
          name: item?.name,
          list: res,
        };
      } else {
        result = item;
      }
      return result;
    });
    curr = { ...current, list: res };
    localStorage?.setItem("collections", JSON.stringify(coll));
    setCurrent(curr);
  };

  return (
    <Container>
      <Font weight="semi-bold">{current?.name?.toUpperCase()}</Font>
      {current?.list?.length !== 0 ? (
        current?.list?.map((item: any, id: number) => (
          <CardAnimeList
            data={item}
            key={id}
            handleDelete={handleDeleteAnime}
          />
        ))
      ) : (
        <Font>
          {`There's currently no collections here! Please be kindly add it from
          anime detail page!`}
        </Font>
      )}
    </Container>
  );
};

export default CollectionsDetailContainer;
