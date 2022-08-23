import {
  AspectRatio,
  Box,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  src: string;
  href: string;
};

const ImagePreview: React.FC<Props> = ({ src, href }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Link onClick={onOpen} display="flex" justifyContent="center">
        <Image src={src} alt="post image" objectFit="contain" dropShadow="lg" />
      </Link>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalBody>
            <Flex maxW="75vw" maxH="75vh">
              <Image
                src={src}
                alt="post image"
                objectFit="contain"
                dropShadow="lg"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImagePreview;
