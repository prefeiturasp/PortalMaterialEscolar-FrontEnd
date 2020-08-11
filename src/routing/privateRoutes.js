import { PaginaInicialFornecedor } from "screens/Logado/PaginaInicialFornecedor";
import { DadosEmpresa } from "screens/Logado/DadosEmpresa";

export const privateRoutes = [
  {
    path: "/adm-fornecedor",
    component: PaginaInicialFornecedor,
    exact: true,
  },
  {
    path: "/adm-fornecedor/dados-empresa",
    component: DadosEmpresa,
    exact: true,
  },
];
