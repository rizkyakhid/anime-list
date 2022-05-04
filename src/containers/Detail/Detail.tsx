import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Font, Modal } from "../../components";
import { queryGetDetailById } from "./queries";
import {
  AddToCollectionLogo,
  CardAddCollection,
  ClickableFont,
  Container,
  InfoWrapper,
  ModalContentWrapper,
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
  const [state, setState] = React.useState({
    collectionModal: false,
    inputNewCollection: false,
  });
  const collections = localStorage?.collections
    ? JSON.parse(localStorage?.collections)
    : [];
  const navigate = useNavigate();

  const handleClickAddToCollection = () => {
    setState({ ...state, collectionModal: true });
  };

  let includedCollections = [] as any;

  collections?.forEach((item: any) => {
    const coll = [] as any;
    item?.list?.forEach((anime: any) => {
      if (anime?.id === data?.Media?.id) {
        coll?.push(item?.name);
      }
    });
    includedCollections = coll;
  });

  if (!localStorage?.collections && !loading) {
    localStorage?.setItem(
      "collections",
      JSON.stringify([
        { id: 1, name: "favorites", list: [data?.Media] },
        { id: 2, name: "to be watched", list: [] },
      ])
    );
  }

  return (
    <>
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
                    <Font size="xs" align="justify" color={"#4f4f4f"}>
                      {item?.value}
                    </Font>
                  </SectionWrapper>
                </div>
              ))}
              <div key={id}>
                <hr />
                <SectionWrapper>
                  <Font size="xs" weight="semi-bold">
                    Collections
                  </Font>
                  <ClickableFont onClick={handleClickAddToCollection}>
                    {"See all collections >"}
                  </ClickableFont>
                </SectionWrapper>
              </div>
            </InfoWrapper>
          </>
        )}
        <Modal
          state={state?.collectionModal}
          width={"100%"}
          onClickOutside={() => setState({ ...state, collectionModal: false })}
        >
          <ModalContentWrapper>
            <Font size="sm" weight="semi-bold">
              {`Collections that includes ${data?.Media?.title?.romaji}`}
            </Font>
            {includedCollections?.length !== 0 ? (
              <Card onClick={() => console.log("test")}>
                {includedCollections?.map((item: any, id: number) => (
                  <CardAddCollection
                    key={id}
                    onClick={() => navigate(`/collections/detail?name=${item}`)}
                  >
                    <Font size="xs" weight="bold">
                      {item?.toUpperCase()}
                    </Font>
                    <Font size="xs" color="#ff6388">
                      {"Collection Detail >"}
                    </Font>
                  </CardAddCollection>
                ))}
              </Card>
            ) : (
              <div>
                <Font size="xs">
                  {`This anime hasn't been added to any collections. Please add it first by clicking button beside anime's name!`}
                </Font>
              </div>
            )}
          </ModalContentWrapper>
        </Modal>
      </Container>
    </>
  );
};

export default DetailContainer;
