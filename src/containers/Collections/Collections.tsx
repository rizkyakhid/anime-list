import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Font, Modal } from "../../components";
import {
  ActionsWrapper,
  ButtonWrapper,
  Container,
  Image,
  InputCollection,
  ModalWrapper,
  NameWrapper,
  SimpleTabWrapper,
  TabActive,
  TabInactive,
} from "./styles";

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
    selectedId: 0,
  });
  const [inputVal, setInputVal] = useState({
    collectionName: "",
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

  // const handleEdit = (e: any, id: number) => {
  //   e.preventDefault();
  //   console.log(id);
  // };

  if (!localStorage?.collections) {
    localStorage?.setItem(
      "collections",
      JSON.stringify([
        { id: 1, name: "favorites", list: [] },
        { id: 2, name: "to be watched", list: [] },
      ])
    );
  }

  const handleOutsideConfirmation = () => {
    setOtherState({ ...otherState, confirmationDelete: false });
  };

  const handleOutsideAddCollection = () => {
    setOtherState({ ...otherState, modalNewCollection: false });
  };

  const handleChangeAddCollection = (e: any) => {
    setInputVal({ ...inputVal, collectionName: e?.target?.value });
  };

  const handleAddNewCollection = () => {
    const newCollection = [
      ...collections,
      {
        id: collections[collections?.length - 1]?.id + 1,
        name: inputVal?.collectionName,
        list: [],
      },
    ];
    localStorage?.setItem("collections", JSON.stringify(newCollection));
    setOtherState({ ...otherState, modalNewCollection: false });
    setCollections(newCollection);
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
                    {/* <div onClick={(e: any) => handleEdit(e, item?.id)}>
                      edit
                    </div> */}
                    <div onClick={(e: any) => handleDelete(e, item?.id)}>
                      del
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
      <Modal
        state={otherState?.modalNewCollection}
        onClickOutside={handleOutsideAddCollection}
      >
        <ModalWrapper>
          <React.Fragment>
            <Font weight="bold">New Collection</Font>
            <Font size="xs" weight="semi-bold">
              Collection Name
            </Font>
            <InputCollection
              type="text"
              value={inputVal?.collectionName}
              onChange={(e: any) => handleChangeAddCollection(e)}
              autoFocus
            />
            <ButtonWrapper>
              <Button width={"100%"} onClick={handleAddNewCollection}>
                ADD COLLECTION
              </Button>
            </ButtonWrapper>
          </React.Fragment>
        </ModalWrapper>
      </Modal>
    </Container>
  );
};

export default CollectionsContainer;
