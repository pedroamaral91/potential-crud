import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { TableCell, TableRow } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { SanitizedData } from "../@types/index";
import api from "../../../services/api";
import { toast } from "react-toastify";

type DeveloperRowProps = {
  developerDTO: SanitizedData;
  onRemove: (id: number) => void;
  currentPage: number;
};

const DeveloperRow: React.FC<DeveloperRowProps> = ({
  developerDTO,
  currentPage,
  onRemove,
}) => {
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    history.push(`/developers/edit/${developerDTO.id}`);
  }, [developerDTO.id, history]);

  const handleRemove = useCallback(
    async (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
      event.stopPropagation();
      try {
        await api.delete(`/developers/${developerDTO.id}`);
        toast.success("Desenvolvedor removido com sucesso!");
        onRemove(developerDTO.id);
      } catch (err) {
        toast.error("Falha ao remover desenvolvedor");
      }
    },
    [developerDTO.id, onRemove]
  );
  return (
    <TableRow onClick={handleRedirect} hover style={{ cursor: "pointer" }}>
      <TableCell>{developerDTO.name}</TableCell>
      <TableCell>{developerDTO.age}</TableCell>
      <TableCell>{developerDTO.sex}</TableCell>
      <TableCell>{developerDTO.date_of_birth}</TableCell>
      <TableCell>{developerDTO.hobby}</TableCell>
      <TableCell onClick={handleRemove}>
        <Delete color="error" />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(DeveloperRow);
