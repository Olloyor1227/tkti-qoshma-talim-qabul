const ModalWrapper = ({children, modalClose}) => {
  return (
    <div className='absolute top-0 left-0 z-50 h-screen w-screen backdrop-blur-md p-10 pt- overflow-y-scroll'>
      <button className='w-10 h-10 rounded-full bg-red-500 text-white absolute top-5 right-5' onClick={() => modalClose()}>X</button>
      {children}
    </div>
  )
}

export default ModalWrapper