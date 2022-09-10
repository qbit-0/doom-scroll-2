import {
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  VStack,
} from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
} & ModalProps;

const FilterModal: FC<Props> = ({
  isOpen,
  onClose,
  children,
  ...innerProps
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="md"
      {...innerProps}
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent mt="4">
        <ModalBody p="2">
          <ButtonGroup display="flex" w="full" variant="outline" p="2">
            <VStack w="full">{children}</VStack>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
