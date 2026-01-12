import React, { useEffect, useState, useCallback } from "react";
import * as Styled from "./AccountManager.styles";
import type { AccountManagerProps } from "./AccountManager.types";
import { AccountCard } from "../../atoms/AccountCard";
import { AccountForm } from "../../molecules/AccountForm";
import {
  getAccounts,
  createAccount,
  removeAccount,
  modifyAccount,
  type AccountResponse,
} from "../../../api/account";
import { getBanks, type BankResponse } from "../../../api/bank";
import { useAuth } from "../../../context/auth";

const API_URL = import.meta.env.VITE_API_URL || "";

export const AccountManager: React.FC<AccountManagerProps> = ({
  className,
}) => {
  const { getAuthorizationNonNull } = useAuth();
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [banks, setBanks] = useState<BankResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AccountResponse | null>(
    null
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [accountsData, banksData] = await Promise.all([
        getAccounts(getAuthorizationNonNull),
        getBanks(getAuthorizationNonNull),
      ]);
      setAccounts(accountsData);
      setBanks(banksData);
    } catch (err) {
      setError("Erreur lors du chargement des données");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getAuthorizationNonNull]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddAccount = async (name: string, bankId: number) => {
    try {
      await createAccount({ name, bank_id: bankId }, getAuthorizationNonNull);
      await fetchData();
      setShowForm(false);
    } catch (err) {
      setError("Erreur lors de l'ajout du compte");
      console.error(err);
    }
  };

  const handleEditAccount = async (name: string, bankId: number) => {
    if (!editingAccount) return;
    try {
      await modifyAccount(
        editingAccount.id,
        { name, bank_id: bankId },
        getAuthorizationNonNull
      );
      await fetchData();
      setEditingAccount(null);
    } catch (err) {
      setError("Erreur lors de la modification du compte");
      console.error(err);
    }
  };

  const handleDeleteAccount = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) return;
    try {
      await removeAccount(id, getAuthorizationNonNull);
      await fetchData();
    } catch (err) {
      setError("Erreur lors de la suppression du compte");
      console.error(err);
    }
  };

  const getBankById = (bankId: number): BankResponse | undefined => {
    return banks.find((b) => b.id === bankId);
  };

  if (loading) {
    return <Styled.LoadingText>Chargement...</Styled.LoadingText>;
  }

  return (
    <Styled.Container className={className}>
      <Styled.Header>
        <Styled.Title>Mes comptes</Styled.Title>
        {!showForm && !editingAccount && (
          <Styled.AddButton onClick={() => setShowForm(true)}>
            + Ajouter un compte
          </Styled.AddButton>
        )}
      </Styled.Header>

      {error && <Styled.ErrorText>{error}</Styled.ErrorText>}

      {showForm && (
        <AccountForm
          banks={banks}
          onSubmit={handleAddAccount}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingAccount && (
        <AccountForm
          banks={banks}
          onSubmit={handleEditAccount}
          onCancel={() => setEditingAccount(null)}
          initialName={editingAccount.name}
          initialBankId={editingAccount.bank_id}
          isEditing
        />
      )}

      <Styled.AccountsList>
        {accounts.length === 0 ? (
          <Styled.EmptyState>
            <Styled.EmptyText>
              Aucun compte pour le moment. Ajoutez votre premier compte !
            </Styled.EmptyText>
          </Styled.EmptyState>
        ) : (
          accounts.map((account) => {
            const bank = getBankById(account.bank_id);
            return (
              <AccountCard
                key={account.id}
                id={account.id}
                name={account.name}
                bankName={bank?.name ?? "Banque inconnue"}
                bankIcon={
                  bank ? `${API_URL}/assets/bank_icons/${bank.icon}` : ""
                }
                onEdit={(id) => {
                  const acc = accounts.find((a) => a.id === id);
                  if (acc) setEditingAccount(acc);
                }}
                onDelete={handleDeleteAccount}
              />
            );
          })
        )}
      </Styled.AccountsList>
    </Styled.Container>
  );
};
