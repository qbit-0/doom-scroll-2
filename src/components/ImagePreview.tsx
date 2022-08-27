import {
  Box,
  BoxProps,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  src: string;
  href: string;
} & BoxProps;

const ImagePreview: React.FC<Props> = ({ src, href, ...innerProps }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box {...innerProps}>
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
            <Image
              display="flex"
              maxW="75vw"
              maxH="75vh"
              src={src}
              alt="post image"
              objectFit="contain"
              dropShadow="lg"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImagePreview;
