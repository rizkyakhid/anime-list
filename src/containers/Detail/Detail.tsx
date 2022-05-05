import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Font } from "../../components";
import { ModalAddToCollections, ModalAllCollections } from "../../fragments";
import { queryGetDetailById } from "./queries";
import {
  ClickableFont,
  Container,
  InfoWrapper,
  SectionWrapper,
  TitleWrapper,
} from "./styles";
import { AiOutlinePlusCircle } from "react-icons/ai";

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
    addToCollectionModal: false,
    inputNewCollection: false,
  });
  const collections = localStorage?.collections
    ? JSON.parse(localStorage?.collections)
    : [];
  const navigate = useNavigate();

  const handleSeeAllCollections = () => {
    setState({ ...state, collectionModal: true });
  };

  const handleClickAddToCollections = () => {
    setState({ ...state, addToCollectionModal: true });
  };

  const handleRoute = (to: string) => {
    navigate(to);
  };

  let includedCollections = [] as any;

  const handleSubmitAddCollection = (array: any[]) => {
    const localStorageInput =
      collections?.length !== 0
        ? collections?.map((item: any) => {
            let res = {} as any;
            if (array?.includes(item?.name)) {
              res = {
                id: item?.id,
                name: item?.name,
                list: [...item?.list, data?.Media],
              };
            } else {
              res = item;
            }
            return res;
          })
        : [];
    localStorage?.setItem("collections", JSON.stringify(localStorageInput));
    setState({ ...state, addToCollectionModal: false });
  };

  collections?.forEach((item: any) => {
    item?.list?.forEach((el: any) => {
      if (el?.id === data?.Media?.id) {
        includedCollections = [...includedCollections, item?.name];
      }
    });
  });

  return (
    <>
      <Container>
        {!loading && (
          <>
            <img src={data?.Media?.bannerImage} alt="" width={"100%"} />
            <InfoWrapper>
              <TitleWrapper>
                <Font weight="semi-bold">{`${data?.Media?.title?.romaji} (${data?.Media?.title?.native})`}</Font>
                <div>
                  <AiOutlinePlusCircle
                    onClick={handleClickAddToCollections}
                    color={"#12B872"}
                    size={"24px"}
                  />
                </div>
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
                  <ClickableFont onClick={handleSeeAllCollections}>
                    {"See all collections >"}
                  </ClickableFont>
                </SectionWrapper>
              </div>
            </InfoWrapper>
          </>
        )}
        <ModalAllCollections
          state={state?.collectionModal}
          data={includedCollections}
          onClickOutside={() => setState({ ...state, collectionModal: false })}
          handleRoute={handleRoute}
        />
        <ModalAddToCollections
          onSubmit={handleSubmitAddCollection}
          data={collections}
          state={state?.addToCollectionModal}
          onClickOutside={() =>
            setState({ ...state, addToCollectionModal: false })
          }
        />
      </Container>
    </>
  );
};

export default DetailContainer;
