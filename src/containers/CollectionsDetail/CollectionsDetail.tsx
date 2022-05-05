import React, { useState } from "react";
import { Button, Font, Modal } from "../../components";
import { CardAnimeList, ModalInputs } from "../../fragments";
import { ButtonWrapper, Container, ModalWrapper, TitleWrapper } from "./styles";
import { AiFillEdit } from "react-icons/ai";

interface ICollectionsDetailContainer {
  name: string;
}

const CollectionsDetailContainer = ({ name }: ICollectionsDetailContainer) => {
  const [collections, setCollections] = useState(
    localStorage?.collections
      ? JSON.parse(localStorage?.collections)
      : ([] as any[])
  );
  const [current, setCurrent] = useState(
    collections?.length !== 0
      ? collections?.find(
          (item: any) =>
            item?.name?.toLowerCase() ===
            name?.toLowerCase()?.replace(/%20/g, " ")
        )
      : []
  );
  const [otherState, setOtherState] = useState({
    confirmationModal: false,
    selectedId: 0,
    modalEditCollection: false,
    buttonValidation: true,
    selectedEditId: 0,
  });
  const [inputVal, setInputVal] = useState({
    editedName: "",
  });

  const handleDeleteAnime = (id: number) => {
    setOtherState({ ...otherState, confirmationModal: true, selectedId: id });
  };

  const handleSubmitDeletion = (id: number) => {
    let curr = {} as any;
    const res = current?.list?.filter((item: any) => item?.id !== id);
    const coll = collections?.map((item: any) => {
      let result = {} as any;
      if (
        item?.name?.toLowerCase() === name?.toLowerCase()?.replace(/%20/g, " ")
      ) {
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

  const handleEdit = (e: any, id: number) => {
    e.preventDefault();
    const res = collections?.filter((item: any) => id === item?.id);
    setOtherState({
      ...otherState,
      modalEditCollection: true,
      selectedEditId: id,
    });
    setInputVal({ ...inputVal, editedName: res[0]?.name });
  };

  const handleOutsideEditCollection = () => {
    setOtherState({ ...otherState, modalEditCollection: false });
  };

  const handleChangeEditCollection = (e: any) => {
    setInputVal({ ...inputVal, editedName: e?.target?.value });
    const validation =
      collections?.filter(
        (item: any) =>
          item?.name?.toLowerCase() === e?.target?.value?.toLowerCase()
      )?.length === 0;
    setOtherState({ ...otherState, buttonValidation: validation });
  };

  const handleEditCollection = () => {
    let curr: any;
    const editedCollection = collections?.map((el: any) => {
      let res: any;
      if (el?.id === otherState?.selectedEditId) {
        res = {
          id: el?.id,
          name: inputVal?.editedName,
          list: el?.list,
        };
        curr = res;
      } else {
        res = el;
      }
      return res;
    });
    localStorage?.setItem("collections", JSON.stringify(editedCollection));
    setOtherState({ ...otherState, modalEditCollection: false });
    setInputVal({ ...inputVal, editedName: "" });
    setCollections(editedCollection);
    setCurrent(curr);
  };

  return (
    <Container>
      <TitleWrapper>
        <Font weight="semi-bold">{current?.name?.toUpperCase()}</Font>
        <AiFillEdit
          color="#1078CA"
          cursor={"pointer"}
          onClick={(e: any) => handleEdit(e, current?.id)}
        />
      </TitleWrapper>
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
      <ModalInputs
        state={otherState?.modalEditCollection}
        inputState={inputVal?.editedName}
        validation={otherState?.buttonValidation}
        handleOutside={handleOutsideEditCollection}
        handleChange={handleChangeEditCollection}
        handleSubmit={handleEditCollection}
        submitButton="CONFIRM CHANGE"
        title="Edit Collection Name"
      />
    </Container>
  );
};

export default CollectionsDetailContainer;
