import { PaginaInicialFornecedor } from "screens/AreaLogada/PaginaInicialFornecedor";
import { DadosEmpresaLogado } from "screens/AreaLogada/DadosEmpresaLogado";
import { TabelaPrecosLogado } from "screens/AreaLogada/TabelaPrecosLogado";
import { AnexosLogado } from "screens/AreaLogada/AnexosLogado";

export const privateRoutes = [
  {
    path: "/adm-fornecedor",
    component: PaginaInicialFornecedor,
    exact: true,
  },
  {
    path: "/adm-fornecedor/dados-empresa",
    component: DadosEmpresaLogado,
    exact: true,
  },
  {
    path: "/adm-fornecedor/tabela-precos",
    component: TabelaPrecosLogado,
    exact: true,
  },
  {
    path: "/adm-fornecedor/anexos",
    component: AnexosLogado,
    exact: true,
  },
];
