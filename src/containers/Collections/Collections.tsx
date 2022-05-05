import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Font, Modal } from "../../components";
import { ModalInputs } from "../../fragments";
import {
  ActionsWrapper,
  ButtonWrapper,
  Container,
  Image,
  ModalWrapper,
  NameWrapper,
  SimpleTabWrapper,
  TabActive,
  TabInactive,
} from "./styles";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const CollectionsContainer = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState(
    localStorage?.collections
      ? JSON.parse(localStorage?.collections)
      : ([] as any[])
  );
  const [otherState, setOtherState] = useState({
    confirmationDelete: false,
    modalNewCollection: false,
    modalEditCollection: false,
    buttonValidation: true,
    selectedId: 0,
    selectedEditId: 0,
  });
  const [inputVal, setInputVal] = useState({
    collectionName: "",
    editedName: "",
  });

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
    setOtherState({ ...otherState, confirmationDelete: true, selectedId: id });
  };

  const handleSubmit = (id: number) => {
    const res = collections?.filter((item: any) => id !== item?.id);
    localStorage?.setItem("collections", JSON.stringify(res));
    setCollections(res);
    setOtherState({ ...otherState, confirmationDelete: false });
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

  const handleOutsideConfirmation = () => {
    setOtherState({ ...otherState, confirmationDelete: false });
  };

  const handleOutsideAddCollection = () => {
    setOtherState({ ...otherState, modalNewCollection: false });
  };

  const handleOutsideEditCollection = () => {
    setOtherState({ ...otherState, modalEditCollection: false });
  };

  const handleChangeAddCollection = (e: any) => {
    setInputVal({ ...inputVal, collectionName: e?.target?.value });
    const validation =
      collections?.filter(
        (item: any) =>
          item?.name?.toLowerCase() === e?.target?.value?.toLowerCase()
      )?.length === 0;
    setOtherState({ ...otherState, buttonValidation: validation });
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

  const handleAddNewCollection = () => {
    const newCollection = [
      ...collections,
      {
        id:
          collections?.length !== 0
            ? collections[collections?.length - 1]?.id + 1
            : 1,
        name: inputVal?.collectionName,
        list: [],
      },
    ];
    localStorage?.setItem("collections", JSON.stringify(newCollection));
    setOtherState({ ...otherState, modalNewCollection: false });
    setInputVal({ ...inputVal, collectionName: "" });
    setCollections(newCollection);
  };

  const handleEditCollection = () => {
    const editedCollection = collections?.map((el: any) => {
      let res: any;
      if (el?.id === otherState?.selectedEditId) {
        res = {
          id: el?.id,
          name: inputVal?.editedName,
          list: el?.list,
        };
      } else {
        res = el;
      }
      return res;
    });
    localStorage?.setItem("collections", JSON.stringify(editedCollection));
    setOtherState({ ...otherState, modalEditCollection: false });
    setInputVal({ ...inputVal, editedName: "" });
    setCollections(editedCollection);
  };

  return (
    <Container>
      <SimpleTabWrapper>
        <TabInactive onClick={handleClickAnimeList}>Anime List</TabInactive>
        <TabActive>All collections</TabActive>
      </SimpleTabWrapper>
      <Button
        onClick={() =>
          setOtherState({ ...otherState, modalNewCollection: true })
        }
      >
        Add Collection
      </Button>
      {collections?.length !== 0 ? (
        collections?.map((item: any, id: number) => (
          <React.Fragment key={id}>
            <Card key={id} to={`/collections/detail?name=${item?.name}`}>
              <Container>
                {item?.list?.length !== 0 && item?.list[0]?.bannerImage && (
                  <Image
                    src={item?.list[0]?.bannerImage}
                    alt=""
                    width={"100%"}
                  />
                )}
                <NameWrapper>
                  <div>
                    <Font weight="semi-bold">{item?.name?.toUpperCase()}</Font>
                  </div>
                  <ActionsWrapper>
                    <div onClick={(e: any) => handleEdit(e, item?.id)}>
                      <AiFillEdit color="#1078CA" />
                    </div>
                    <div onClick={(e: any) => handleDelete(e, item?.id)}>
                      <AiFillDelete color="#E83939" />
                    </div>
                  </ActionsWrapper>
                </NameWrapper>
              </Container>
            </Card>
          </React.Fragment>
        ))
      ) : (
        <div>
          Currently, there is no collection. Please be kindly to add some using
          the button above!
        </div>
      )}
      <Modal
        state={otherState?.confirmationDelete}
        onClickOutside={handleOutsideConfirmation}
      >
        <ModalWrapper>
          <React.Fragment>
            <Font weight="bold">Delete Collection</Font>
            <Font size="xs">Are you sure to delete this collection?</Font>
            <ButtonWrapper>
              <Button
                width={"47.5%"}
                variant="secondary"
                onClick={handleOutsideConfirmation}
              >
                NO
              </Button>
              <Button
                width={"47.5%"}
                onClick={() => handleSubmit(otherState?.selectedId)}
              >
                YES
              </Button>
            </ButtonWrapper>
          </React.Fragment>
        </ModalWrapper>
      </Modal>
      <ModalInputs
        state={otherState?.modalNewCollection}
        inputState={inputVal?.collectionName}
        validation={otherState?.buttonValidation}
        handleOutside={handleOutsideAddCollection}
        handleChange={handleChangeAddCollection}
        handleSubmit={handleAddNewCollection}
      />
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

export default CollectionsContainer;
