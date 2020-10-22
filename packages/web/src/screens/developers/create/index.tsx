import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import DeveloperForm from "../form/index";
import { Developer, SanitizedData } from "../@types/index";
import api from "../../../services/api";
import { toast } from "react-toastify";

const CreateDeveloper: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSave = useCallback(
    async (developerData: SanitizedData) => {
      setLoading(true);
      try {
        await api.post<Developer>("/developers", developerData);
        toast.success("Developer cadastrado com sucesso!");
        history.push(`/`);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [history]
  );

  return (
    <DeveloperForm
      title="Novo Developer"
      defaultValues={{
        date_of_birth: new Date(),
        sex: "",
        name: "",
        age: 0,
        hobby: "",
      }}
      loading={loading}
      onSave={handleSave}
    />
  );
};

export default CreateDeveloper;
