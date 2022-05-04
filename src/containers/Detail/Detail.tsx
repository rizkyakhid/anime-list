import { useQuery } from "@apollo/client";
import React from "react";
import { Font } from "../../components";
import { queryGetDetailById } from "./queries";
import {
  AddToCollectionLogo,
  Container,
  InfoWrapper,
  SectionWrapper,
  TitleWrapper,
} from "./styles";

interface IDetailContainerProps {
  id: number;
}

const DetailContainer = ({ id }: IDetailContainerProps) => {
  const { data, loading } = useQuery(queryGetDetailById, {
    variables: { id },
  });
  const detailData = [
    {
      field: "Description",
      value: data?.Media?.description?.replace(/<br>/g, ""),
    },
    { field: "Season Year", value: data?.Media?.seasonYear },
    { field: "Total Episodes", value: data?.Media?.episodes },
    { field: "Duration", value: `${data?.Media?.duration} minutes` },
    { field: "Status", value: data?.Media?.status },
  ];
  return (
    <Container>
      {!loading && (
        <>
          <img src={data?.Media?.bannerImage} alt="" width={"100%"} />
          <InfoWrapper>
            <TitleWrapper>
              <Font weight="semi-bold">{`${data?.Media?.title?.romaji} (${data?.Media?.title?.native})`}</Font>
              <AddToCollectionLogo>+</AddToCollectionLogo>
            </TitleWrapper>
            {detailData?.map((item: any, id: number) => (
              <div key={id}>
                <hr />
                <SectionWrapper>
                  <Font size="xs" weight="semi-bold">
                    {item?.field}
                  </Font>
                  <Font size="xs" align="justify" color="#4f4f4f">
                    {item?.value}
                  </Font>
                </SectionWrapper>
              </div>
            ))}
          </InfoWrapper>
        </>
      )}
    </Container>
  );
};

export default DetailContainer;
