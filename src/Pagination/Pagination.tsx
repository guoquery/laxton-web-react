import React, { useEffect, useState } from "react";


interface PaginationProps {
  total: number;
  current?: number;
  onChange: (action: any) => any;
  pageSize?: number;
  onShowSizeChange?: (current: any, size: any) => any
  // children?: any
}
export const Pagination = (props: PaginationProps) => {
  const [total, setTotal] = useState(props.total);
  const [pageSize, setPageSize] = useState(props.pageSize || 10);
  const [current, setCurrent] = useState(props.current || 1);
  const [totalPages] = useState(Math.ceil(total / pageSize));
  // const [pagination, setPagination] = useState();


  const go = (i: number) => {
    setCurrent(i);
    props.onChange({ page: i, pageSize: pageSize })
  }
  const goByAction = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      if (current < 2) { return }
      setCurrent(current - 1);
      props.onChange({ page: current - 1, pageSize: pageSize })
    } else {
      if (current >= totalPages) { return }
      setCurrent(current + 1);
      props.onChange({ page: current + 1, pageSize: pageSize })
    }
  }
  const renderPage = () => {
    let pagerList = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pagerList.push(
          <li className={current === i ? 'active' : "pages"} onClick={() => go(i)} key={i}>{i}</li>
        );
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        if (i < 6 || i === totalPages) {
          pagerList.push(
            <li className={current === i ? 'active' : "pages"} onClick={() => go(i)} key={i}>{i}</li>
          );
        } else if (i === 6) {
          pagerList.push(
            <li className={current === i ? 'active' : "pages"} onClick={() => go(i)} key={i}>...</li>
          );
        }
      }
    }

    return pagerList
  }
  const showTotal = () => {
    const start = 1 + (current - 1) * pageSize;
    const end = current * pageSize < total ? current * pageSize : total
    return `${start}-${end} of ${total}`
  }
  return (
    <div className={'pageMain'}>
      {showTotal()}
      <ul className={'pagination'}>
        <li onClick={() => goByAction('prev')} className={current === 1 ? 'pagination-disabled' : ''}>Prev</li>
        {renderPage()}
        <li onClick={() => goByAction('next')} className={current === totalPages ? 'pagination-disabled' : ''}>Next</li>
      </ul>
    </div>
  );
};
