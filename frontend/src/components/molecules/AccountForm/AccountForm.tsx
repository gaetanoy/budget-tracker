import React, { useState } from "react";
import * as Styled from "./AccountForm.styles";
import type { AccountFormProps } from "./AccountForm.types";

const API_URL = import.meta.env.VITE_API_URL || "";

export const AccountForm: React.FC<AccountFormProps> = ({
  banks,
  onSubmit,
  onCancel,
  initialName = "",
  initialBankId,
  isEditing = false,
}) => {
  const [name, setName] = useState(initialName);
  const [selectedBankId, setSelectedBankId] = useState<number | null>(
    initialBankId ?? null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && selectedBankId !== null) {
      onSubmit(name.trim(), selectedBankId);
      if (!isEditing) {
        setName("");
        setSelectedBankId(null);
      }
    }
  };

  return (
    <Styled.FormContainer onSubmit={handleSubmit}>
      <Styled.FormTitle>
        {isEditing ? "Modifier le compte" : "Ajouter un compte"}
      </Styled.FormTitle>

      <Styled.FormGroup>
        <Styled.Label htmlFor="accountName">Nom du compte</Styled.Label>
        <Styled.Input
          id="accountName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Compte courant, Livret A..."
          required
        />
      </Styled.FormGroup>

      <Styled.FormGroup>
        <Styled.Label>Choisir une banque</Styled.Label>
        <Styled.BankSelect>
          {banks.map((bank) => (
            <Styled.BankOption
              key={bank.id}
              type="button"
              $selected={selectedBankId === bank.id}
              onClick={() => setSelectedBankId(bank.id)}
            >
              <Styled.BankIcon
                src={`${API_URL}/assets/bank_icons/${bank.icon}`}
                alt={bank.name}
              />
              <Styled.BankName>{bank.name}</Styled.BankName>
            </Styled.BankOption>
          ))}
        </Styled.BankSelect>
      </Styled.FormGroup>

      <Styled.ButtonGroup>
        {onCancel && (
          <Styled.CancelButton type="button" onClick={onCancel}>
            Annuler
          </Styled.CancelButton>
        )}
        <Styled.SubmitButton
          type="submit"
          disabled={!name.trim() || selectedBankId === null}
        >
          {isEditing ? "Enregistrer" : "Ajouter"}
        </Styled.SubmitButton>
      </Styled.ButtonGroup>
    </Styled.FormContainer>
  );
};
