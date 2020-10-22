import React, { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";

import api from "../../../services/api";
import { Developer, SanitizedData } from "../@types/index";
import DeveloperForm from "../form/index";
import { Button } from "@material-ui/core";

const EditDeveloper: React.FC = () => {
  const history = useHistory();
  const { developerID } = useParams<{ developerID: string }>();
  const [developer, setDeveloper] = useState<Developer>();
  const [loading, setLoading] = useState(false);

  const fetchDeveloper = useCallback(async () => {
    try {
      const { data } = await api.get<Developer>(`/developers/${developerID}`);
      setDeveloper(data);
    } catch (err) {
      toast.error("Usuário não encontrado");
    }
  }, [developerID]);

  const handleSave = useCallback(
    async (developerData: SanitizedData) => {
      setLoading(true);
      try {
        const { data } = await api.put<Developer>(
          `/developers/${developerID}`,
          developerData
        );
        setDeveloper(data);
        toast.success("Desenvolvedor atualizado com sucesso!");
      } catch (err) {
        toast.error("Falha ao editar desenvolvedor");
      } finally {
        setLoading(false);
      }
    },
    [developerID]
  );

  const handleRemove = useCallback(async () => {
    try {
      await api.delete(`/developers/${developerID}`);
      toast.success("Desenvolvedor removido com sucesso!");
      history.push("/");
    } catch (err) {
      toast.error("Falha ao remover desenvolvedor");
    }
  }, [developerID, history]);

  useEffect(() => {
    if (!developerID) return;
    fetchDeveloper();
  }, [developerID, fetchDeveloper]);

  return developer ? (
    <DeveloperForm
      title="Editar Developer"
      defaultValues={developer}
      onSave={handleSave}
      loading={loading}
      slotUpdateDeveloperButton={
        <Button color="secondary" variant="contained" onClick={handleRemove}>
          Remover
        </Button>
      }
    />
  ) : null;
};

export default EditDeveloper;
