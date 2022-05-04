import React from "react";
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

  const currentDetail =
    collections?.length !== 0
      ? collections?.find(
          (item: any) =>
            item?.name?.toLowerCase() === name?.replace(/%20/g, " ")
        )
      : [];

  return (
    <Container>
      <Font weight="semi-bold">{currentDetail?.name?.toUpperCase()}</Font>
      {currentDetail?.list?.length !== 0 ? (
        currentDetail?.list?.map((item: any, id: number) => (
          <CardAnimeList data={item} key={id} />
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
