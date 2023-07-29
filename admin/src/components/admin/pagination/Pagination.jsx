import React from "react";
// import classnames from "classnames";
// import { usePagination, DOTS } from "../../../utils/usePagination";
import "./Pagination.css";

// const Pagination = (props) => {
//   const {
//     onPageChange,
//     totalCount,
//     siblingCount = 1,
//     currentPage,
//     pageSize,
//     className
//   } = props;

//   const paginationRange = usePagination({
//     currentPage,
//     totalCount,
//     siblingCount,
//     pageSize
//   });

//   if (currentPage === 0 || paginationRange.length < 2) {
//     return null;
//   }

//   const onNext = () => {
//     onPageChange(currentPage + 1);
//   };

//   const onPrevious = () => {
//     onPageChange(currentPage - 1);
//   };

//   let lastPage = paginationRange[paginationRange.length - 1];
//   return (
//     <ul
//       className={classnames("pagination-container", { [className]: className })}
//     >
//       <li
//         className={classnames("pagination-item", {
//           disabled: currentPage === 1
//         })}
//         onClick={onPrevious}
//       >
//         <div>prev</div>
//       </li>
//       {paginationRange.map((pageNumber) => {
//         if (pageNumber === DOTS) {
//           return <li className="pagination-item dots">&#8230;</li>;
//         }

//         return (
//           <li
//             className={classnames("pagination-item", {
//               selected: pageNumber === currentPage
//             })}
//             onClick={() => onPageChange(pageNumber)}
//           >
//             {pageNumber}
//           </li>
//         );
//       })}
//       <li
//         className={classnames("pagination-item", {
//           disabled: currentPage === lastPage
//         })}
//         onClick={onNext}
//       >
//         <div>next</div>
//       </li>
//     </ul>
//   );
// };

//   export default Pagination;

const Pagination = (props) => {
    const handlePagination = (current) => {
      props.pagination(current);
    };
  
    return (
      <div className="flex items-center justify-center py-5">
        <nav aria-label="Page navigation example">
          <ul className="pagination flex gap-5">
            <li className="page-item">
              <a
                className={`page-link ${
                  props.current === 1 ? "disabled" : props.current > 1 ? "" : ""
                }`}
                href="#"
                onClick={() => handlePagination(props.current - 1)}
              >
                Previous
              </a>
            </li>
            {props.total < 7 ? (
              <>
                {Array.apply(0, Array(props.total)).map((arr, i) => (
                  <>
                    <li
                      key={i}
                      className={`page-item ${
                        props.current === i + 1 ? "active" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => handlePagination(i + 1)}
                      >
                        {i + 1}
                      </a>
                    </li>
                  </>
                ))}
              </>
            ) : props.current % 5 >= 0 &&
              props.current > 4 &&
              props.current + 2 < props.total ? (
              <>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(1)}
                  >
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link disabled" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(props.current - 1)}
                  >
                    {props.current - 1}
                  </a>
                </li>
                <li className="page-item active">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(props.current)}
                  >
                    {props.current}
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(props.current + 1)}
                  >
                    {props.current + 1}
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link disabled" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(props.total)}
                  >
                    {props.total}
                  </a>
                </li>
              </>
            ) : props.current % 5 >= 0 &&
              props.current > 4 &&
              props.current + 2 >= props.total ? (
              <>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(1)}
                  >
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link disabled" href="#">
                    ...
                  </a>
                </li>
                <li
                  className={`page-item ${
                    props.current === props.total - 3 ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(props.total - 3)}
                  >
                    {props.total - 3}
                  </a>
                </li>
                <li
                  className={`page-item ${
                    props.current === props.total - 2 ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(props.total - 2)}
                  >
                    {props.total - 2}
                  </a>
                </li>
                <li
                  className={`page-item ${
                    props.current === props.total - 1 ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(props.total - 1)}
                  >
                    {props.total - 1}
                  </a>
                </li>
                <li
                  className={`page-item ${
                    props.current === props.total ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(props.total)}
                  >
                    {props.total}
                  </a>
                </li>
              </>
            ) : (
              <>
                {Array.apply(0, Array(5)).map((arr, i) => (
                  <>
                    <li
                      className={`page-item ${
                        props.current === i + 1 ? "active" : ""
                      }`}
                      key={i}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => handlePagination(i + 1)}
                      >
                        {i + 1}
                      </a>
                    </li>
                  </>
                ))}
                <li className="page-item">
                  <a className="page-link disabled" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(props.total)}
                  >
                    {props.total}
                  </a>
                </li>
              </>
            )}
            <li className="page-item">
              <a
                className={`page-link ${
                  props.current === props.total
                    ? "disabled"
                    : props.current < props.total
                    ? ""
                    : ""
                }`}
                href="#"
                onClick={() => handlePagination(props.current + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
};
  
export default Pagination;
