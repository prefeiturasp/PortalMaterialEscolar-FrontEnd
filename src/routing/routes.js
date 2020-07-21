import { MegaPortal } from "screens/MegaPortal";
import { CadastroFornecedor } from "../screens/CadastroFornecedor";
import { PortalFornecedor } from "screens/PortalFornecedor";
import { PortalFamilia } from "screens/PortalFamilia";
import { FinalizadoComSucesso } from "screens/FinalizadoComSucesso";
import { MapaFornecedores } from "screens/MapaFornecedores";

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
  {
    path: "/familia",
    component: PortalFamilia,
    exact: true,
  },
  {
    path: "/confirmacao-cadastro",
    component: FinalizadoComSucesso,
    exact: true,
  },
  {
    path: "/mapa-de-fornecedores",
    component: MapaFornecedores,
    exact: true,
  },
];
