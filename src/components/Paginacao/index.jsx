import React from "react";
import { Pagination } from "antd";
import { QUANTIDADE_POR_PAGINA } from "./constants";
import "antd/dist/antd.css";
import "./style.scss";

export const Paginacao = props => {
  const { total, onChange, className, ...rest } = props;
  return (
    <section className="pt-3 footer-pagination-default">
      <Pagination
        className={className}
        defaultCurrent={1}
        defaultPageSize={QUANTIDADE_POR_PAGINA}
        onChange={onChange}
        total={total}
        size="medium"
        {...rest}
      />
    </section>
  );
};
