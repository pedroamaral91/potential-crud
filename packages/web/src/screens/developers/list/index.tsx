import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { parseISO, format } from "date-fns";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";

import Input from "../../../components/input";
import Table from "../../../components/table";
import api from "../../../services/api";
import { AxiosGetResponse, SanitizedData } from "../@types/index";

import DeveloperRow from "./row";

export const columns = [
  { id: "name", label: "Nome", minWidth: 100 },
  { id: "age", label: "Idade", minWidth: 50 },
  { id: "sex", label: "Sexo", minWidth: 50 },
  { id: "date_of_birth", label: "Data de Nascimento", minWidth: 100 },
  { id: "hobby", label: "Hobby", minWidth: 100 },
  { id: "remove", label: "Excluir", minWidth: 50 },
];

const ListDevelopers: React.FC = () => {
  const history = useHistory();
  const [developers, setDevelopers] = useState<SanitizedData[]>([]);
  const currentPage = useRef(1);
  const totalDevelopers = useRef(0);
  const name = useRef("");
  const age = useRef("");

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      name.current = event.target.value;
    },
    []
  );

  const handleAgeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      age.current = event.target.value;
    },
    []
  );

  const fetchDevelopers = useCallback(async (page = 1) => {
    try {
      const queryParams = new URLSearchParams();
      if (name.current) queryParams.set("name", name.current);
      if (age.current) queryParams.set("age", age.current);
      queryParams.set("page", page);
      const { data } = await api.get<AxiosGetResponse>(
        `/developers?${queryParams.toString()}`
      );
      const sanitizedData = data.developers.map((dev) => ({
        ...dev,
        date_of_birth: format(parseISO(dev.date_of_birth), "dd/MM/yyyy"),
      }));

      currentPage.current = data.page;
      totalDevelopers.current = data.total;
      setDevelopers(sanitizedData);
    } catch (err) {
      console.log({ err });
    }
  }, []);

  const handleRedirect = useCallback(() => {
    history.push("/developers/add");
  }, [history]);

  const handlePageChange = useCallback(
    (page: number) => {
      fetchDevelopers(page + 1);
      currentPage.current = page + 1;
    },
    [fetchDevelopers]
  );

  const rows = useMemo(() => {
    return developers.map((developer) => (
      <DeveloperRow
        key={developer.id}
        developerDTO={developer}
        fetchDevelopers={fetchDevelopers}
        currentPage={currentPage.current}
      />
    ));
  }, [developers, fetchDevelopers]);

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  return (
    <>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        style={{ maxWidth: "100vw" }}
      >
        <Input
          name="name"
          label="Nome"
          variant="outlined"
          margin="dense"
          fullWidth
          onChange={handleNameChange}
        />
        <Input
          name="name"
          label="Idade"
          type="number"
          variant="outlined"
          margin="dense"
          fullWidth
          onChange={handleAgeChange}
        />
        <Button
          style={{ marginRight: "0.5rem" }}
          color="primary"
          variant="outlined"
          startIcon={<Search />}
          onClick={fetchDevelopers}
        >
          Pesquisar
        </Button>
        <Button
          color="primary"
          variant="outlined"
          startIcon={<Add />}
          onClick={handleRedirect}
        >
          Adicionar
        </Button>
      </Grid>
      <Grid item>
        <Table
          slotRows={rows}
          columns={columns}
          onChangePage={handlePageChange}
          totalCount={totalDevelopers.current}
          page={currentPage.current}
        />
      </Grid>
    </>
  );
};

export default ListDevelopers;
