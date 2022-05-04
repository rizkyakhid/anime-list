import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Font, Modal } from "../../components";
import { ButtonWrapper, CheckboxWrapper, Container } from "./styles";

interface IModalAddToCollectionsProps {
  data: any[];
  state: boolean;
  onClickOutside: () => void;
  onSubmit: (array: any[]) => void;
}

const ModalAddToCollections = ({
  state,
  onClickOutside,
  data,
  onSubmit,
}: IModalAddToCollectionsProps) => {
  const [localState, setLocalState] = React.useState({
    selectedCollection: [] as any[],
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    if (!localState?.selectedCollection?.includes(e?.target?.name)) {
      setLocalState({
        ...localState,
        selectedCollection: [
          ...localState?.selectedCollection,
          e?.target?.name,
        ],
      });
    } else {
      const filtered = localState?.selectedCollection?.filter(
        (item: any) => item !== e?.target?.name
      );
      setLocalState({ ...localState, selectedCollection: filtered });
    }
  };

  return (
    <Modal state={state} onClickOutside={onClickOutside} width={"100%"}>
      <Container>
        {data?.length !== 0 ? (
          <React.Fragment>
            <Font weight="bold">Add to collections</Font>
            <Font size="xs">Select which collections to be added:</Font>
            <div>
              {data?.map((item: any, id: number) => (
                <CheckboxWrapper key={id}>
                  <input
                    type="checkbox"
                    id={item?.id}
                    name={item?.name}
                    checked={localState?.selectedCollection?.includes(
                      item?.name
                    )}
                    onChange={handleChange}
                  />
                  <label htmlFor={item?.id}>
                    <Font size="xs">{item?.name?.toUpperCase()}</Font>
                  </label>
                </CheckboxWrapper>
              ))}
            </div>
            <ButtonWrapper>
              <Button
                width={"47.5%"}
                variant="secondary"
                onClick={onClickOutside}
              >
                CANCEL
              </Button>
              <Button
                width={"47.5%"}
                onClick={() => onSubmit(localState?.selectedCollection)}
              >
                SAVE
              </Button>
            </ButtonWrapper>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Font weight="bold">Oops!</Font>
            <Font size="xs">{`It seems that you haven't created any collections yet. Please add it at the Collections page!`}</Font>
            <Button onClick={() => navigate("/collections")}>
              Go to Collections page
            </Button>
          </React.Fragment>
        )}
      </Container>
    </Modal>
  );
};

export default ModalAddToCollections;
