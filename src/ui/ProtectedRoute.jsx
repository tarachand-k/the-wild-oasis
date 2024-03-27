import React from "react";
import styled from "styled-components";

import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // 1. Load the authenticated use
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // 2. If there is NO authenticated user, redirect to the login page
  React.useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While loading, show a spinner
  if (isLoading) {
    return (
      <Wrapper>
        <Spinner />;
      </Wrapper>
    );
  }

  if (isAuthenticated) return children;
}

const Wrapper = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ProtectedRoute;
