import React, { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";

import Input from "../../../components/input";
import Table from "../../../components/table";
import api from "../../../services/api";
import { Developer, AxiosGetResponse } from "../@types/index";

import { columns } from "./locales";

const ListDevelopers: React.FC = () => {
  const history = useHistory();
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const name = useRef("");
  const age = useRef("");
  const currentPage = useRef(1);
  const totalDevelopers = useRef(0);

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

  const fetchDevelopers = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();
      if (name.current) queryParams.set("name", name.current);
      if (age.current) queryParams.set("age", age.current);
      const { data } = await api.get<AxiosGetResponse>(
        `/developers?${queryParams.toString()}`
      );
      setDevelopers(data.developers);
      currentPage.current = data.page;
      totalDevelopers.current = data.total;
    } catch (err) {
      console.log({ err });
    }
  }, []);

  const handleRedirect = useCallback(() => {
    history.push("/developers/add");
  }, [history]);

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  return (
    <>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Input
          name="name"
          label="Nome"
          variant="outlined"
          margin="dense"
          fullWidth
          gridConfig={{ xs: 12, sm: 3, md: 3 }}
          onChange={handleNameChange}
        />
        <Input
          name="name"
          label="Idade"
          type="number"
          variant="outlined"
          margin="dense"
          fullWidth
          gridConfig={{ xs: 12, sm: 3, md: 3 }}
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
          rows={developers}
          columns={columns}
          onChangePage={() => {}}
          page={currentPage.current}
          totalCount={totalDevelopers.current}
        />
      </Grid>
    </>
  );
};

export default ListDevelopers;
