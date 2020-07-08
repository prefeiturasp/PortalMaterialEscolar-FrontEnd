import { MegaPortal } from "screens/MegaPortal";
import { CadastroFornecedor } from "../screens/CadastroFornecedor";
import { PortalFornecedor } from "screens/PortalFornecedor";

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
  {
    path: "/fornecedor",
    component: PortalFornecedor,
    exact: true,
  },
];
