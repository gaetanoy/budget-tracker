import React from "react";
import * as Styled from "./AccountCard.styles";
import type { AccountCardProps } from "./AccountCard.types";

export const AccountCard: React.FC<AccountCardProps> = ({
  id,
  name,
  bankName,
  bankIcon,
  onEdit,
  onDelete,
}) => {
  return (
    <Styled.CardContainer>
      <Styled.AccountInfo>
        <Styled.BankIcon src={bankIcon} alt={bankName} />
        <Styled.AccountDetails>
          <Styled.AccountName>{name}</Styled.AccountName>
          <Styled.BankName>{bankName}</Styled.BankName>
        </Styled.AccountDetails>
      </Styled.AccountInfo>
      <Styled.Actions>
        {onEdit && (
          <Styled.ActionButton $variant="edit" onClick={() => onEdit(id)}>
            Modifier
          </Styled.ActionButton>
        )}
        {onDelete && (
          <Styled.ActionButton $variant="delete" onClick={() => onDelete(id)}>
            Supprimer
          </Styled.ActionButton>
        )}
      </Styled.Actions>
    </Styled.CardContainer>
  );
};
