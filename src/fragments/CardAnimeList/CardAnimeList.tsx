import { Card, Font } from "../../components";
import React from "react";
import { CardWrapper, InfoWrapper } from "./styles";

interface ICardAnimeProps {
  data: any;
  onClick?: () => void;
}

const CardAnimeList = ({ data, onClick }: ICardAnimeProps) => {
  const handleClick = () => {
    onClick && onClick();
  };
  return (
    <Card onClick={handleClick} to={`/detail?id=${data?.id}`}>
      <CardWrapper>
        <img height={139} width={100} src={data?.coverImage?.medium} alt="" />
        <InfoWrapper>
          <Font weight="semi-bold">{data?.title?.romaji}</Font>
          <Font size="xs">
            <span>{data?.meanScore}</span> / 100
          </Font>
          <Font size="xs">{data?.seasonYear}</Font>
          <Font size="xs">{`${data?.episodes} Episode${
            data?.episodes !== 1 ? "s" : ""
          }`}</Font>
        </InfoWrapper>
      </CardWrapper>
    </Card>
  );
};

export default CardAnimeList;
