import { MegaPortal } from "screens/MegaPortal";
import { CadastroFornecedor } from "../screens/CadastroFornecedor";

export const routes = [
  {
    path: "/",
    component: MegaPortal,
    exact: true,
  },
  {
    path: "/fornecedor/cadastro",
    component: CadastroFornecedor,
    exact: true,
  },
];
