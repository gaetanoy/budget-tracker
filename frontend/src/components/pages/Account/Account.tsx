import { useNavigate } from "react-router";
import * as Styled from "./Account.styles.ts";
import { IoPerson } from "react-icons/io5";
import { useAuth } from "../../../context/auth.ts";
import { Suspense, use } from "react";
import { getProfile, type ProfileResponse } from "../../../api/auth.ts";

function UserInfoValue({ userInfo }: { userInfo: Promise<string> }) {
  const profile = use(userInfo);
  return profile;
}

function Loading() {
  return "Loading...";
}

function UserInfo({ userInfo }: { userInfo: Promise<ProfileResponse> }) {
  return (
    <>
      <Styled.InfoGroup>
        <Styled.Label>Nom d'utilisateur</Styled.Label>
        <Styled.Value>
          <Suspense fallback={<Loading />}>
            <UserInfoValue userInfo={userInfo.then((user) => user.username)} />
          </Suspense>
        </Styled.Value>
      </Styled.InfoGroup>

      <Styled.InfoGroup>
        <Styled.Label>Email</Styled.Label>
        <Styled.Value>
          <Suspense fallback={<Loading />}>
            <UserInfoValue userInfo={userInfo.then((user) => user.email)} />
          </Suspense>
        </Styled.Value>
      </Styled.InfoGroup>
    </>
  );
}

export default function Account() {
  const navigate = useNavigate();

  const { logout, getAuthorizationNonNull } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const userInfo = getProfile(getAuthorizationNonNull);

  return (
    <Styled.Container>
      <Styled.ProfileCard>
        <Styled.Avatar>
          <IoPerson />
        </Styled.Avatar>

        <h2 style={{ margin: 0, textTransform: "uppercase" }}>Mon Profil</h2>

        <UserInfo userInfo={userInfo} />

        <Styled.ButtonGroup>
          <Styled.ActionButton onClick={() => navigate("/")} $variant="neutral">
            Retour à l'accueil
          </Styled.ActionButton>

          <Styled.ActionButton onClick={handleLogout} $variant="danger">
            Se déconnecter
          </Styled.ActionButton>
        </Styled.ButtonGroup>
      </Styled.ProfileCard>
    </Styled.Container>
  );
}
