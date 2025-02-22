import styled from "styled-components";
import useUser from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  padding: 4px 6px;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  height: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-brand-500);
`;

function UserAvatar({ onClick }) {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <StyledUserAvatar onClick={onClick}>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
