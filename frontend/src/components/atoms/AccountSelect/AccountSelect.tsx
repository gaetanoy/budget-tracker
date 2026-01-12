import React from "react";
import * as Styled from "./AccountSelect.styles";
import type { AccountSelectProps } from "./AccountSelect.types";

export const AccountSelect: React.FC<AccountSelectProps> = ({
  accounts,
  banks,
  selectedAccountId,
  onChange,
  label = "Compte",
  required = false,
}) => {
  const getBankName = (bankId: number): string => {
    const bank = banks.find((b) => b.id === bankId);
    return bank?.name ?? "";
  };

  return (
    <Styled.Container>
      {label && <Styled.Label>{label}</Styled.Label>}
      <Styled.SelectWrapper>
        <Styled.Select
          value={selectedAccountId ?? ""}
          onChange={(e) => onChange(Number(e.target.value))}
          required={required}
        >
          <option value="" disabled>
            Sélectionner un compte
          </option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} ({getBankName(account.bank_id)})
            </option>
          ))}
        </Styled.Select>
        <Styled.Arrow>▼</Styled.Arrow>
      </Styled.SelectWrapper>
    </Styled.Container>
  );
};
