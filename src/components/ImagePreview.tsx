import {
  Box,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import Frame from "./Frame";
import PostAndComments from "./PostAndComments";

type Props = {
  src: string;
  href: string;
};

const ImagePreview: React.FC<Props> = ({ src, href }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <figure>
        <Link onClick={onOpen}>
          <Image
            className="max-h-[40rem] drop-shadow-lg"
            alt="post body"
            src={src}
          />
          <Box>
            <p>{href}</p>
          </Box>
        </Link>
      </figure>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalBody>
            <Image
              className="max-h-[40rem] drop-shadow-lg"
              alt="post body"
              src={src}
            />
            <Box>
              <p>{href}</p>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImagePreview;
