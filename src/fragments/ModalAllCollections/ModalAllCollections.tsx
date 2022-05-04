import React from "react";
import { Card, Font, Modal } from "../../components";
import { CardAddCollection, ModalContentWrapper } from "./styles";

interface IModalAllCollectionsProps {
  data: any[];
  state: boolean;
  onClickOutside: () => void;
  handleRoute: (to: string) => void;
}

const ModalAllCollections = ({
  state,
  data,
  onClickOutside,
  handleRoute,
}: IModalAllCollectionsProps) => {
  return (
    <Modal state={state} width={"100%"} onClickOutside={onClickOutside}>
      <ModalContentWrapper>
        <Font size="sm" weight="semi-bold">
          {`Collections included`}
        </Font>
        {data?.length !== 0 ? (
          data?.map((item: any, id: number) => (
            <Card key={id}>
              <CardAddCollection
                onClick={() => handleRoute(`/collections/detail?name=${item}`)}
              >
                <Font size="xs" weight="bold">
                  {item?.toUpperCase()}
                </Font>
                <Font size="xs" color="#ff6388">
                  {"Collection Detail >"}
                </Font>
              </CardAddCollection>
            </Card>
          ))
        ) : (
          <div>
            <Font size="xs">
              {`This anime hasn't been added to any collections. Please add it first by clicking button beside anime's name!`}
            </Font>
          </div>
        )}
      </ModalContentWrapper>
    </Modal>
  );
};

export default ModalAllCollections;
