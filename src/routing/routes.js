import { LandingPage } from "screens/LandingPage";
import { CadastroFornecedor } from "../screens/CadastroFornecedor";

export const routes = [
  {
    path: "/",
    component: LandingPage,
    exact: true,
  },
  {
    path: "/fornecedor/cadastro",
    component: CadastroFornecedor,
    exact: true,
  },
];
