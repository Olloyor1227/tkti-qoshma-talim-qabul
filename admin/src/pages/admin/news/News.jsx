import React from 'react'

const News = () => {
  return (
    <div>News</div>
  )
}

export default News

// import { useEffect, useState } from "react";

// import {
//   EditForm,
//   Form,
//   FormHeader,
//   SkeletonPost,
//   Table,
// } from "../../../components";
// import { DeleteIcon, EditIcon } from "../../../assets/icons";

// import { ClientApiService } from "../../../utils/apiClient";
// const { add, get, update } = new ClientApiService();

// const getter = async (state, setState) => {
//   setState({ ...state, loading: true });
//   const res = await get("application/");
//   if (res?.success) setState({ loading: false, data: res?.data, err: "" });
//   else setState({ loading: false, data: [], err: "Server bilan xatolik" });
// };

// const Users = () => {
//   const [status, setStatus] = useState("read");
//   const [onEdit, setOnEdit] = useState("");
//   const [news1, setNews1] = useState({});

//   useEffect(() => {
//     getter(news1, setNews1);
//   }, []);

//   const analyseNameTableHead = [
//     "T/r",
//     "Ismi",
//     "Status",
//     "Amallar",
//     "Status",
//     "Amallar",
//     "Status",
//     "Amallar",
//   ];
//   const renderHead = (item, index) => <th key={index}>{item}</th>;
//   const renderBody = (item, index) => {
//     return (
//       <tr key={index} className="cursor-pointer hover:bg-gray-100">
//         <td>{index + 1}</td>
//         <td>{item.name}</td>
//         <td>
//           <span
//             className={`${
//               item?.paid_file ? "bg-green-400" : "bg-red-600"
//             } text-white p-2 rounded-lg`}
//           >
//             {item?.paid_file ? "Faol" : "Nofaol"}
//           </span>
//         </td>
//         <td className="">
//           <button
//             className="mr-4 hover:scale-125"
//             onClick={() => {
//               setOnEdit({ open: true, id: item._id });
//             }}
//           >
//             <EditIcon />
//           </button>
//           <button
//             className="hover:scale-125"
//             onClick={() => {
//               const deleteConfirm = confirm(
//                 "Malumotni o'chirishga tayyormisiz? ⚠"
//               );
//             }}
//           >
//             <span className="">
//               <DeleteIcon />
//             </span>
//           </button>
//         </td>
//       </tr>
//     );
//   };

//   let content = null;
//   let fetchedContent = news1?.loading ? (
//     [...Array(10).keys()].map((i) => <SkeletonPost key={i} />)
//   ) : news1?.err ? (
//     <h1 className="text-3xl text-center p-10 bg-gray-100">Xatolik yuz berdi</h1>
//   ) : (
//     <>
//       <Table
//         headData={analyseNameTableHead}
//         renderHead={renderHead}
//         bodyData={news1?.data ?? []}
//         renderBody={renderBody}
//         limit={10}
//       />
//     </>
//   );

//   let formData = news1?.loading ? (
//     [...Array(10).keys()].map((i) => <SkeletonPost key={i} />)
//   ) : (
//     <>
//       <Form />
//     </>
//   );

//   status === "read"
//     ? (content = fetchedContent)
//     : status === "create"
//     ? (content = formData)
//     : (content = null);
//   return (
//     <div>
//       {onEdit.open && (
//         <EditForm
//           id={onEdit.id}
//           closeModal={() => setOnEdit({ open: false })}
//           url="news"
//         />
//       )}
//       <FormHeader
//         title="News"
//         event2="Add"
//         handleEvent2={() => setStatus("create")}
//         event1="All news"
//         handleEvent1={() => setStatus("read")}
//       />
//       {content}
//     </div>
//   );
// };

// export default Users;
