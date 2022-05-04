import { Card, Font } from "../../components";
import React from "react";
import { ActionButton, CardWrapper, InfoWrapper } from "./styles";

interface ICardAnimeProps {
  data: any;
  onClick?: () => void;
  handleDelete?: (id: number) => void;
}

const CardAnimeList = ({ data, onClick, handleDelete }: ICardAnimeProps) => {
  const handleClick = () => {
    onClick && onClick();
  };
  const onClickDelete = (e: any, id: number) => {
    e?.preventDefault();
    handleDelete && handleDelete(id);
  };
  return (
    <Card onClick={handleClick} to={`/detail?id=${data?.id}`}>
      <CardWrapper>
        <img height={139} width={100} src={data?.coverImage?.medium} alt="" />
        <InfoWrapper>
          <div>
            <Font weight="semi-bold">{data?.title?.romaji}</Font>
            <Font size="xs">
              <span>{data?.meanScore}</span> / 100
            </Font>
            <Font size="xs">{data?.seasonYear}</Font>
            <Font size="xs">{`${data?.episodes} Episode${
              data?.episodes !== 1 ? "s" : ""
            }`}</Font>
          </div>
          {handleDelete && (
            <ActionButton>
              <div onClick={(e) => onClickDelete(e, data?.id)}>DEL</div>
            </ActionButton>
          )}
        </InfoWrapper>
      </CardWrapper>
    </Card>
  );
};

export default CardAnimeList;
