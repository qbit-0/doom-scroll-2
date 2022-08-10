import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { ChangeEventHandler, FC, useState } from "react";

import { getCommentsPath } from "../lib/utils/urlUtils";
import Frame from "./Frame";
import PostAndComments from "./PostAndComments";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  subreddit: string;
  postId: string;
  initialPost?: any;
  initialComments?: any;
};

const PostAndCommentsModal: FC<Props> = ({
  isOpen,
  onClose,
  subreddit,
  postId,
  initialPost,
  initialComments,
}) => {
  const [sort, setSort] = useState("best");
  const { path, query } = getCommentsPath(subreddit, postId, sort);

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSort(event.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalBody>
          <Frame>
            <Select value={sort} onChange={handleSortChange}>
              <option value="best">Best</option>
              <option value="top">Top</option>
              <option value="new">New</option>
              <option value="controversial">Controversial</option>
              <option value="old">Old</option>
              <option value="qa">Q&A</option>
            </Select>
            <PostAndComments
              path={path}
              query={query}
              initialPost={initialPost}
              initialComments={initialComments}
            />
          </Frame>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostAndCommentsModal;
