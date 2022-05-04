import React, { useState } from "react";
import { Button, Font, Modal } from "../../components";
import { CardAnimeList } from "../../fragments";
import { ButtonWrapper, Container, ModalWrapper } from "./styles";

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
  const [otherState, setOtherState] = useState({
    confirmationModal: false,
    selectedId: 0,
  });

  const handleDeleteAnime = (id: number) => {
    setOtherState({ ...otherState, confirmationModal: true, selectedId: id });
  };

  const handleSubmitDeletion = (id: number) => {
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
    setOtherState({ ...otherState, confirmationModal: false });
    setCurrent(curr);
  };

  const handleClickOutside = () => {
    setOtherState({ ...otherState, confirmationModal: false });
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
      <Modal
        state={otherState?.confirmationModal}
        onClickOutside={handleClickOutside}
      >
        <ModalWrapper>
          <React.Fragment>
            <Font weight="bold">Delete Anime from collection</Font>
            <Font size="xs">
              Are you sure to delete this anime from collection?
            </Font>
            <ButtonWrapper>
              <Button
                width={"47.5%"}
                variant="secondary"
                onClick={handleClickOutside}
              >
                NO
              </Button>
              <Button
                width={"47.5%"}
                onClick={() => handleSubmitDeletion(otherState?.selectedId)}
              >
                YES
              </Button>
            </ButtonWrapper>
          </React.Fragment>
        </ModalWrapper>
      </Modal>
    </Container>
  );
};

export default CollectionsDetailContainer;
