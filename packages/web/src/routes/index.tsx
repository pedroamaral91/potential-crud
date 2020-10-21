import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import GlobalLoader from "../components/global-loader";
import Layout from "../components/layout";

const Developers = lazy(() => import("../screens/developers"));
const CreateDeveloper = lazy(() => import("../screens/developers/create"));

const Routes = () => (
  <Switch>
    <Suspense fallback={<GlobalLoader />}>
      <Layout>
        <Route component={Developers} path="/" exact />
        <Route component={CreateDeveloper} path="/developers/add" exact />
      </Layout>
    </Suspense>
  </Switch>
);

export default Routes;
